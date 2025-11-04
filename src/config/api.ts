/**
 * API Configuration
 * 
 * This file provides the backend API base URL with environment variable support.
 * 
 * Phase 19.4: Refactored to use VITE_API_BASE_URL environment variable with
 * fallback to production URL for reliability.
 * 
 * The environment variable should be the base URL WITHOUT /api path:
 * VITE_API_BASE_URL=https://blkxchange-backend-1.onrender.com
 * 
 * API calls should append /api/endpoint to this base URL.
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://blkxchange-backend-1.onrender.com";
