export const SESSION_DURATION_MS = 15 * 60 * 1000
export const SESSION_WARNING_THRESHOLD_MS = 60 * 1000

export type SessionStatus = 'active' | 'warning' | 'expired'

export interface PrivacySessionState {
  deadlineMs: number
  remainingMs: number
  status: SessionStatus
}

export function createSessionDeadline(nowMs: number = Date.now()): number {
  return nowMs + SESSION_DURATION_MS
}

export function evaluateSession(
  deadlineMs: number,
  nowMs: number = Date.now(),
): PrivacySessionState {
  const remainingMs = Math.max(0, deadlineMs - nowMs)
  let status: SessionStatus = 'active'
  if (remainingMs === 0) {
    status = 'expired'
  } else if (remainingMs <= SESSION_WARNING_THRESHOLD_MS) {
    status = 'warning'
  }

  return {
    deadlineMs,
    remainingMs,
    status,
  }
}

export function formatCountdown(remainingMs: number): string {
  const totalSeconds = Math.ceil(Math.max(0, remainingMs) / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

