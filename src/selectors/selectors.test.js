import expect from "expect";
import {authorsFormattedForDropdown} from "./selectors";

describe("Author Selectors", () => {
  describe("authorsFormattedForDropdown", () => {
    it("should return author data formatted for use in dropdown", () => {
      const authors = [
        {id: "bolaji-olajide", firstName: "Bolaji", lastName: "Olajide"},
        {id: "inumidun-amao", firstName: "Inumidun", lastName: "Amao"}
      ];

      const expected = [
        {value: "bolaji-olajide", text: "Bolaji Olajide"},
        {value: "inumidun-amao", text: "Inumidun Amao"}
      ];

      expect(authorsFormattedForDropdown(authors)).toEqual(expected);
    });
  });
});
