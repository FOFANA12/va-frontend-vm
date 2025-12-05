import auth from './auth';
import profile from './profile';
import attachment from './attachment';
import employee from './employee';
import strategicMap from './strategicMap';
import matrixPeriod from './matrixPeriod';
import strategicStakeholder from './strategicStakeholder';
import strategicElement from './strategicElement';
import strategicObjective from './strategicObjective';
import strategicObjectiveAlignment from './strategicObjectiveAlignment';
import actionPlan from './actionPlan';
import action from './action';
import actionStatus from './actionStatus';
import actionPlanning from './actionPlanning';
import actionPhase from './actionPhase';
import phaseTask from './task';
import actionControl from './actionControl';
import actionAlignment from './actionAlignment';
import supplier from './supplier';
import contract from './contract';
import supplierEvaluation from './supplierEvaluation';
import actionFundDisbursement from './actionFundDisbursement';
import actionFundReceipt from './actionFundReceipt';
import decision from './decision';
import decisionStatus from './decisionStatus';

import structure from './structure';
import actionDomain from './actionDomain';
import actionDomainStatus from './actionDomainStatus';
import actionDomainState from './actionDomainState';

import strategicDomain from './strategicDomain';
import strategicDomainState from './strategicDomainState';
import strategicDomainStatus from './strategicDomainStatus';

import capabilityDomain from './capabilityDomain';
import capabilityDomainState from './capabilityDomainState';
import capabilityDomainStatus from './capabilityDomainStatus';

import elementaryLevel from './elementaryLevel';
import elementaryLevelState from './elementaryLevelState';
import elementaryLevelStatus from './elementaryLevelStatus';

import indicator from './indicator';
import indicatorPlanning from './indicatorPlanning';
import indicatorControl from './indicatorControl';
import indicatorStatus from './indicatorStatus';

import dashboard from './dashboard';
import report from './report';

import logActivity from './logActivity';

import currencySettings from './settings/currency';
import fundingSourceSettings from './settings/fundingSource';
import projectOwnerSettings from './settings/projectOwner';
import delegatedProjectOwnerSettings from './settings/delegatedProjectOwner';
import userSettings from './settings/user';
import regionSettings from './settings/region';
import fileTypeSettings from './settings/fileType';
import departmentSettings from './settings/department';
import municipalitySettings from './settings/municipality';
import expenseTypeSettings from './settings/expenseType';
import beneficiarySettings from './settings/beneficiary';
import stakeholderSettings from './settings/stakeholder';
import paymentModeSettings from './settings/paymentMode';
import budgetTypeSettings from './settings/budgetType';
import indicatorCategorySettings from './settings/indicatorCategory';
import defaultPhaseSettings from './settings/defaultPhase';
import roleSettings from './settings/role';

export const endpoints = {
  auth,
  profile,
  attachment,
  structure,
  employee,
  strategicMap,
  strategicStakeholder,
  matrixPeriod,
  strategicElement,
  strategicObjective,
  strategicObjectiveAlignment,
  actionPlan,
  action,
  actionStatus,
  actionPlanning,
  actionPhase,
  phaseTask,
  actionControl,
  actionAlignment,
  actionFundDisbursement,
  actionFundReceipt,
  decision,
  decisionStatus,
  indicator,
  indicatorPlanning,
  indicatorControl,
  indicatorStatus,
  report,
  dashboard,
  logActivity,

  supplier,
  contract,
  supplierEvaluation,
  actionDomain,
  actionDomainStatus,
  actionDomainState,

  strategicDomain,
  strategicDomainStatus,
  strategicDomainState,

  capabilityDomain,
  capabilityDomainStatus,
  capabilityDomainState,
  
  elementaryLevel,
  elementaryLevelState,
  elementaryLevelStatus,

  settings: {
    fileType: fileTypeSettings,
    currency: currencySettings,
    fundingSource: fundingSourceSettings,
    region: regionSettings,
    projectOwner: projectOwnerSettings,
    delegatedProjectOwner: delegatedProjectOwnerSettings,
    department: departmentSettings,
    municipality: municipalitySettings,
    user: userSettings,
    beneficiary: beneficiarySettings,
    stakeholder: stakeholderSettings,
    paymentMode: paymentModeSettings,
    expenseType: expenseTypeSettings,
    budgetType: budgetTypeSettings,
    indicatorCategory: indicatorCategorySettings,
    defaultPhase: defaultPhaseSettings,
    role: roleSettings,
  },
};
