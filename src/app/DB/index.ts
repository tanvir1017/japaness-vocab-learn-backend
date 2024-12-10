import env from "../config";
import { USER_ROLE } from "../modules/user/constant/user.constant";
import { User } from "../modules/user/model/user.model";

const seedAdminUser = {
  id: "A-0001",
  email: "admin@gmail.com",
  password: env.ADMIN_PASSWORD,
  role: "admin",
  needsPasswordChange: false,
  passwordChangedAt: new Date(),
  status: "not-verified",
  isDeleted: false,
};

const seedAdmin = async () => {
  // when database is connected, we will check who is super admin
  const admin = await User.findOne({ role: USER_ROLE.admin });

  if (!admin) {
    await User.create(seedAdminUser);
  }
};

export default seedAdmin;
