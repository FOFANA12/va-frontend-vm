import currencyRoutes from './currency';
import fundingSourceRoutes from './fundingSource';
import projectOwnerRoutes from './projectOwner';
import userRoutes from './user';
import regionRoutes from './region';
import delegatedProjectOwnerRoutes from './delegatedProjectOwner';
import departmentRoutes from './department';
import municipalityRoutes from './municipality';
import beneficiaryRoutes from './beneficiary';
import stakeholderRoutes from './stakeholder';
import paymentModeRoute from './paymentMode';
import expenseTypeRoute from './expenseType';
import budgetTypeRoute from './budgetTypes';
import indicatorCategoryRoute from './indicatorCategory';
import defaultPhaseRoutes from './defaultPhase';
import fileTypeRoutes from './fileType';
import roleRoutes from './role';

export default [
  ...currencyRoutes,
  ...fundingSourceRoutes,
  ...projectOwnerRoutes,
  ...delegatedProjectOwnerRoutes,
  ...userRoutes,
  ...regionRoutes,
  ...departmentRoutes,
  ...municipalityRoutes,
  ...beneficiaryRoutes,
  ...stakeholderRoutes,
  ...paymentModeRoute,
  ...expenseTypeRoute,
  ...budgetTypeRoute,
  ...indicatorCategoryRoute,
  ...defaultPhaseRoutes,
  ...fileTypeRoutes,
  ...roleRoutes,
];
