import User from "../model/userModel.js";

export async function register(req, res) {
  try {
    const data = new User(req.body);
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
    if (password != user.password) {
      return res.status(400).json({ error: "Invalid Credentials." });
    }
    return res.status(200).json({ msg: "Login Successfully" });
  } catch (error) {
    return res.status(500).json({ error: `error : ${error}` });
  }
}
