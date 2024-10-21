import express from "express";
import {
  checkTransaction,
  companyEmailDetail,
  countInvitedLearners,
  countTotalUsers,
  enrolledUserCount,
  getLicenseCountByCompanyId,
  getPaidUsersCount,
  getUserStats,
  getUserStatusCounts,
  inviteLearners,
  neftTransaction,
} from "../../controller/admin/admin.controller.mjs";
const router = express.Router();

router.get("/paidusercount", getPaidUsersCount);
router.get("/userstatus", getUserStatusCounts);
router.get("/userstates", getUserStats);
router.get("/totaluser", countTotalUsers);
// ---------------------------------------------------------------
router.post("/invite_learners/:company_id", inviteLearners);
router.get("/bussuserdetails/:bussiness_id", companyEmailDetail);
router.post("/nefttransation/:bussiness_id", neftTransaction);
router.post("/checktransation/:bussiness_id", checkTransaction);

router.get("/licensecount/:company_id", getLicenseCountByCompanyId);
router.get("/invitecount/:company_id", countInvitedLearners);
router.get("/enrolledcount/:company_id", enrolledUserCount);

export default router;
