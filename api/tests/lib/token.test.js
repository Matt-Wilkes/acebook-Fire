const JWT = require("jsonwebtoken");

const generateToken = require("../../lib/token");

describe("TokenGenerator", () => {
  describe("jsonwebtoken", () => {
    test("returns a token containing user_id that is valid for 10 minutes", () => {
      const id_1 = 1;
      const id_2 = 2;

      // Encode tokens
      const token_1 = generateToken(user_id);
      const token_2 = generateToken(user_id);
      expect(token_1).not.toEqual(token_2);

      // Decode tokens
      const payload_1 = decode_token(token_1);
      const payload_2 = decode_token(token_2);

      expect(payload_1.user_id).toEqual(id_1);
      expect(payload_2.user_id).toEqual(id_2);

      // Token is valid for 600 seconds (10 minutes)
      expect(payload_1.exp - payload_1.iat).toEqual(600);
    });
  });
});
