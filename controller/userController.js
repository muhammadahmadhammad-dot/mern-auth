import User from "../model/userModel.js";
import bycrypt from "bcryptjs"
export async function register(req, res) {
  try {
    const {fname,lname, email, password} = req.body;
    const hash = await bycrypt.hash(password,10)

    const data = new User({fname,lname, email, password:hash});
    const user = await data.save();
    return res
      .status(201)
      .json({ msg: "Your are register successfully!", user: user });
  } catch (error) {
    return res.status(500).json({ error: `error : ${error}` });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials." });
    }
    const hash = await bycrypt.compare(password, user.password)
    if (hash) {
      return res.status(400).json({ error: "Invalid Credentials." });
    }
    return res.status(200).json({ msg: "Login Successfully" });
  } catch (error) {
    return res.status(500).json({ error: `error : ${error}` });
  }
}
