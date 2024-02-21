const OTPAuth = require("otpauth");

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function init() {
  let totp = new OTPAuth.TOTP({
    issuer: "ACME",
    label: "AzureDiamond",
    algorithm: "SHA1",
    digits: 6,
    period: 2,
    secret: "NB2W45DFOIZA", // or 'OTPAuth.Secret.fromBase32("NB2W45DFOIZA")'
  });

  // Generate a token (returns the current token as a string).
  let token = totp.generate();

  //token = totp.generate();

  // Validate a token (returns the token delta or null if it is not found in the search window, in which case it should be considered invalid).
  let delta = totp.validate({ token, window: 1 });

  // Convert to Google Authenticator key URI:
  // otpauth://totp/ACME:AzureDiamond?issuer=ACME&secret=NB2W45DFOIZA&algorithm=SHA1&digits=6&period=30
  let uri = totp.toString(); // or 'OTPAuth.URI.stringify(totp)'

  // Convert from Google Authenticator key URI.
  totp = OTPAuth.URI.parse(uri);

  // get some more tokens -- timeout is 3 seconds.
  token = totp.generate();
  console.log(token);
  console.log("Wait 5 seconds...");
  await delay(5000);
  console.log("5 seconds have passed");
  token = totp.generate();
  console.log(token);
}

init();
// Create a new TOTP object.
