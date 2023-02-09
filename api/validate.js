const phoneUtil =
  require("google-libphonenumber").PhoneNumberUtil.getInstance();

export default function validate(req, res) {
  if (req.method === "POST") {
    const { phoneNumber } = req.body;
    if (!phoneNumber)
      return res.json({ success: false, message: "There is no phone number" });

    const number = phoneUtil.parse(phoneNumber);

    if (phoneUtil.isValidNumber(number)) {
      const countryCode = number.getCountryCode();
      const countryName = phoneUtil.getRegionCodeForNumber(number);

      return res.json({ success: true, data: { countryCode, countryName} });
    } else {
      return res.json({ success: false, message: "invalid phone number" });
    }
  } else {
    return res.json({ success: false, message: "method not allowed" });
  }
}
