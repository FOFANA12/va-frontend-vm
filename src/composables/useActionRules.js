export function useActionRules() {
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
  // 🔵 MODIFICATION DE L’ACTION
  // - interdit si locked
  // -------------------------------------------------------------------
  const canManageAction = (status) => !isLocked(status);

  // -------------------------------------------------------------------
  // 🔵 PLANNING
  // - autorisé si NON locked
  // -------------------------------------------------------------------
  const canPlanned = (status) => !isLocked(status);

  // -------------------------------------------------------------------
  // 🔵 CONTRÔLE
  // ✔️ Création : uniquement status === "in_progress"
  // ✔️ Gestion (edit/delete) : autorisé tant que NOT locked
  // -------------------------------------------------------------------
  const canCreateControl = (status) => normalizeStatus(status) === 'in_progress';
  const canManageControl = (status) => !isLocked(status);

  // -------------------------------------------------------------------
  // 🔵 DECISIONS
  // ✔️ Création : uniquement status === "in_progress"
  // ✔️ Gestion : autorisé si NOT locked
  // -------------------------------------------------------------------
  const canCreateDecision = (status) => normalizeStatus(status) === 'in_progress';
  const canManageDecision = (status) => !isLocked(status);

  // -------------------------------------------------------------------
  // 🔵 FICHIERS
  // ✔️ Upload : toujours autorisé
  // ✔️ Delete : interdit si locked
  // -------------------------------------------------------------------
  const canUploadFile = () => true;
  const canDeleteFile = (status) => !isLocked(status);

  // ---------------------------------------------------------
  // 🔵 ALIGNEMENT
  // - autorisé si NON closed et NON stopped
  // ---------------------------------------------------------
  const canManageAlignment = (status) => !isLocked(status);;

  return {
    normalizeStatus,
    isClosed,
    isStopped,
    isLocked,
    canManageAction,
    canCreateDecision,
    canManageDecision,
    canUploadFile,
    canDeleteFile,
    canPlanned,
    canCreateControl,
    canManageControl,
    canManageAlignment
  };
}
