-- ==========================================
-- INARA v2.0
-- Módulo: Riesgo académico del estudiante
-- Archivo: 008_student_risk.sql
--
-- Objetivo:
-- Registrar el análisis del estado académico
-- de cada estudiante.
--
-- Este módulo permite:
-- - Detectar señales tempranas de abandono.
-- - Identificar causas del riesgo.
-- - Generar seguimiento personalizado.
-- - Alimentar recomendaciones de Atlas.
--
-- Flujo:
-- Datos académicos
--        ↓
-- Análisis de riesgo
--        ↓
-- Recomendaciones
--        ↓
-- Seguimiento
-- ==========================================
-- Niveles posibles de riesgo académico

CREATE TYPE risk_level AS ENUM (
    'low',
    'medium',
    'high',
    'critical'
);
-- Registro del análisis de riesgo académico

CREATE TABLE student_risk (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    student_id UUID NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    risk_score INTEGER NOT NULL
        CHECK (risk_score >= 0 AND risk_score <= 100),

    level risk_level NOT NULL DEFAULT 'low',

    attendance_score INTEGER NOT NULL DEFAULT 0
        CHECK (attendance_score >= 0 AND attendance_score <= 100),

    xp_score INTEGER NOT NULL DEFAULT 0
        CHECK (xp_score >= 0 AND xp_score <= 100),

    engagement_score INTEGER NOT NULL DEFAULT 0
        CHECK (engagement_score >= 0 AND engagement_score <= 100),

    streak_score INTEGER NOT NULL DEFAULT 0
        CHECK (streak_score >= 0 AND streak_score <= 100),

    main_reason TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Índices para consultas rápidas

CREATE INDEX idx_student_risk_student
ON student_risk(student_id);

CREATE INDEX idx_student_risk_level
ON student_risk(level);

CREATE INDEX idx_student_risk_score
ON student_risk(risk_score);
