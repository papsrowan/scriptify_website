import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limiting simple (en production, utiliser Redis ou similaire)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requêtes par minute
const RATE_WINDOW = 60 * 1000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const userData = rateLimitMap.get(ip);

  if (!userData || now > userData.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return false;
  }

  if (userData.count >= RATE_LIMIT) {
    return true;
  }

  userData.count++;
  return false;
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const clientIP = request.headers.get('x-client-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  if (clientIP) {
    return clientIP;
  }

  return request.ip || 'unknown';
}

// Liste noire d'IPs suspectes
const blockedIPs = [
  '94.156.152.67' // IP identifiée dans les logs d'attaque
];

export function middleware(request: NextRequest) {
  const ip = getClientIP(request);
  const url = request.nextUrl.pathname;

  // Bloquer les IPs suspectes
  if (blockedIPs.includes(ip)) {
    console.warn(`IP bloquée: ${ip}`);
    return new Response('Forbidden', { status: 403 });
  }

  // Rate limiting pour les API
  if (url.startsWith('/api/')) {
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Trop de requêtes. Veuillez réessayer plus tard.' },
        { status: 429 }
      );
    }
  }

  // Protection contre les injections SQL et XSS basiques
  const suspiciousPatterns = [
    /(\bUNION\b|\bSELECT\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b|\bDROP\b|\bCREATE\b|\bALTER\b)/i,
    /(<script|javascript:|vbscript:|onload=|onerror=|onclick=)/i,
    /(\.\.|\/etc\/|\/var\/|\/usr\/|\/home\/)/,
    /base64_decode|eval\(|exec\(|system\(|shell_exec\(|passthru\(/i
  ];

  const userAgent = request.headers.get('user-agent') || '';
  const query = request.nextUrl.search;
  // Note: request.body est un ReadableStream, on ne peut pas le vérifier directement ici
  // Pour les POST, la validation se fait dans les routes API

  const checkString = `${userAgent} ${query}`;

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(checkString)) {
      console.warn(`Requête suspecte bloquée depuis IP: ${ip}, Pattern: ${pattern}`);
      return NextResponse.json(
        { error: 'Requête invalide' },
        { status: 400 }
      );
    }
  }

  // Headers de sécurité supplémentaires
  const response = NextResponse.next();

  // Protection contre le clickjacking
  response.headers.set('X-Frame-Options', 'DENY');

  // Protection contre le MIME sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // Politique de référent
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Désactiver les fonctionnalités dangereuses
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};