// ===========================================
// Puerto
// ===========================================

process.env.PORT = process.env.PORT || 4000;

// ===========================================
// Vencimiento de Token
// ===========================================

process.env.CADUCIDAD_TOKEN = "1h";

// ===========================================
// SEED de autenticacion
// ===========================================

process.env.SEED_AUTENTICACION =
  process.env.SEED_AUTENTICACION || "seed-ciclo-4-a";
