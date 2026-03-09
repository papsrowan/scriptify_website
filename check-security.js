#!/usr/bin/env node

/**
 * 🔐 Script de vérification de sécurité Scriptify
 * Vérifie les vulnérabilités courantes et la conformité sécurité
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔐 Vérification de sécurité Scriptify\n');

// Vérifications
const checks = {
  dependencies: false,
  dockerfile: false,
  apiSecurity: false,
  middleware: false,
  headers: false
};

try {
  // 1. Vérifier les vulnérabilités des dépendances
  console.log('📦 Vérification des dépendances...');
  try {
    execSync('npm audit --audit-level=moderate', { stdio: 'pipe' });
    console.log('✅ Aucune vulnérabilité critique détectée');
    checks.dependencies = true;
  } catch (error) {
    console.log('⚠️  Vulnérabilités détectées - exécutez: npm audit fix');
  }

  // 2. Vérifier le Dockerfile
  console.log('\n🐳 Vérification du Dockerfile...');
  const dockerfile = fs.readFileSync('Dockerfile', 'utf8');
  if (dockerfile.includes('USER nextjs') && dockerfile.includes('FROM node:20-alpine')) {
    console.log('✅ Dockerfile sécurisé (utilisateur non-root, image alpine)');
    checks.dockerfile = true;
  } else {
    console.log('⚠️  Dockerfile nécessite des améliorations de sécurité');
  }

  // 3. Vérifier la sécurité de l'API
  console.log('\n🔌 Vérification de la sécurité API...');
  const apiFile = fs.readFileSync('src/app/api/send-mail/route.ts', 'utf8');
  if (apiFile.includes('sanitizedName') && apiFile.includes('typeof name') && apiFile.includes('replace(/[<')) {
    console.log('✅ API sécurisée avec validation et sanitisation');
    checks.apiSecurity = true;
  } else {
    console.log('⚠️  API nécessite des améliorations de sécurité');
  }

  // 4. Vérifier le middleware
  console.log('\n🛡️  Vérification du middleware...');
  if (fs.existsSync('src/middleware.ts')) {
    const middleware = fs.readFileSync('src/middleware.ts', 'utf8');
    if (middleware.includes('rateLimit') && middleware.includes('suspiciousPatterns')) {
      console.log('✅ Middleware de sécurité actif');
      checks.middleware = true;
    } else {
      console.log('⚠️  Middleware incomplet');
    }
  } else {
    console.log('❌ Middleware manquant');
  }

  // 5. Vérifier les headers de sécurité
  console.log('\n🔒 Vérification des headers de sécurité...');
  const nextConfig = fs.readFileSync('next.config.js', 'utf8');
  if (nextConfig.includes('Content-Security-Policy') && nextConfig.includes('X-Frame-Options')) {
    console.log('✅ Headers de sécurité configurés');
    checks.headers = true;
  } else {
    console.log('⚠️  Headers de sécurité manquants');
  }

  // Résumé
  console.log('\n📊 Résumé des vérifications:');
  Object.entries(checks).forEach(([check, passed]) => {
    const status = passed ? '✅' : '❌';
    console.log(`${status} ${check}`);
  });

  const passedCount = Object.values(checks).filter(Boolean).length;
  const totalCount = Object.keys(checks).length;

  console.log(`\n🎯 Score de sécurité: ${passedCount}/${totalCount}`);

  if (passedCount === totalCount) {
    console.log('🎉 Toutes les vérifications de sécurité sont passées!');
  } else {
    console.log('⚠️  Certaines vérifications ont échoué. Consultez SECURITY.md pour les corrections.');
  }

} catch (error) {
  console.error('❌ Erreur lors de la vérification:', error.message);
  process.exit(1);
}