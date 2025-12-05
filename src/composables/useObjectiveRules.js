export function useObjectiveRules() {
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

  // ---------------------------------------------------------
  // 🔵 MODIFICATION DE L’OBJECTIF
  // - interdit dès "engaged", "closed", "stopped"
  // ---------------------------------------------------------
  const canEditObjective = (status) => {
    const code = normalizeStatus(status);
    return code !== 'engaged';
  };

  // ---------------------------------------------------------
  // 🔵 ALIGNEMENT
  // - autorisé si NON closed et NON stopped
  // ---------------------------------------------------------
  const canManageAlignment = (status) => {
    const code = normalizeStatus(status);
    return code !== 'closed' && code !== 'stopped';
  };

  // ---------------------------------------------------------
  // 🔵 DECISIONS
  // - création : uniquement "engaged"
  // - gestion : interdit seulement si closed/stopped
  // ---------------------------------------------------------
  const canCreateDecision = (status) => normalizeStatus(status) === 'engaged';

  const canManageDecision = (status) => {
    const code = normalizeStatus(status);
    return code !== 'closed' && code !== 'stopped';
  };

  // ---------------------------------------------------------
  // 🔵 FICHIERS
  // - upload : toujours autorisé
  // - suppression : interdit si closed/stopped
  // ---------------------------------------------------------
  const canUploadFile = () => true;

  const canDeleteFile = (status) => {
    const code = normalizeStatus(status);
    return code !== 'closed' && code !== 'stopped';
  };

  return {
    normalizeStatus,
    isClosed,
    isStopped,
    isLocked,
    canEditObjective,
    canManageAlignment,
    canCreateDecision,
    canManageDecision,
    canUploadFile,
    canDeleteFile,
  };
}
