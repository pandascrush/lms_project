import express from "express";
import {
  activeUsersData,
  checkApproved,
  checkUpdate,
  companyDetails,
  getCheck,
  getCompanyCount,
  getNeft,
  getSubscribedUserCount,
  monthlyProgressData,
  neftApproved,
  neftUpdate,
  revenueData,
  subscribersData,
} from "../../controller/superadmin/superadmin.controller.mjs";
const router = express.Router();

router.get("/companycount", getCompanyCount);
router.get("/enrollcount", getSubscribedUserCount);

router.get("/getcheck", getCheck);
router.get("/getNeft", getNeft);
router.get("/checkapproved", checkApproved);
router.get("/neftapproved", neftApproved);
router.put("/checkupdate", checkUpdate);
router.put("/neftupdate", neftUpdate);

router.get("/monthlyprogress", monthlyProgressData);
router.get("/revenuedata", revenueData);
router.get("/companydetails", companyDetails);
router.get("/subscribersdata", subscribersData);
router.get("/activeusersdata", activeUsersData);

export default router;