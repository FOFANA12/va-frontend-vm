export function useIndicatorRules() {
  // Normalize
  const normalizeStatus = (status) => {
    if (!status) return null;
    if (typeof status === 'string') return status;
    if (typeof status === 'object' && status.code) return status.code;
    return null;
  };

  const isClosed = (status) => normalizeStatus(status) === 'closed';
  const isStopped = (status) => normalizeStatus(status) === 'stopped';
  const isLocked = (status) => {
    const code = normalizeStatus(status);
    return code === 'closed' || code === 'stopped';
  };

  // -------------------------------------------------------------------
  // 🔵 Règle : Gestion d’un indicateur (edit, delete)
  // - gestion : interdit seulement si closed/stopped
  // -------------------------------------------------------------------
  const canManageIndicator = (status) => !isLocked(status);

  // -------------------------------------------------------------------
  // 🔵 Règle : Planning de l’indicateur (create/edit/delete planning)
  // - autorisé si status ∈ [created, planned, in_progress]
  // - interdit si closed ou stopped
  // -------------------------------------------------------------------
  const canPlanned = (status) => !isLocked(status);

  // -------------------------------------------------------------------
  // 🔵 CONTRÔLE
  // ✔️ Création d’un contrôle : uniquement si status === "in_progress"
  // ✔️ Gestion (edit/delete) des contrôles : autorisé tant que NOT closed/stopped
  // -------------------------------------------------------------------
  const canCreateControl = (status) => normalizeStatus(status) === 'in_progress';

  const canManageControl = (status) => !isLocked(status);

  // ---------------------------------------------------------
  // 🔵 DECISIONS
  // - création : uniquement "in_progress"
  // - gestion : interdit seulement si closed/stopped
  // ---------------------------------------------------------
  const canCreateDecision = (status) => normalizeStatus(status) === 'in_progress';

  const canManageDecision = (status) => !isLocked(status);

  // ---------------------------------------------------------
  // 🔵 FICHIERS
  // - upload : toujours autorisé
  // - suppression : interdit si closed/stopped
  // ---------------------------------------------------------
  const canUploadFile = () => true;

  const canDeleteFile = (status) => !isLocked(status);

  return {
    normalizeStatus,
    isClosed,
    isStopped,
    isLocked,
    canManageIndicator,
    canCreateDecision,
    canManageDecision,
    canUploadFile,
    canDeleteFile,
    canPlanned,
    canCreateControl,
    canManageControl,
  };
}
