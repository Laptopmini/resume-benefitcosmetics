import {
  bannerEntrance,
  marqueeDrift,
  parallaxFloat,
  sparklePulse,
  tiltOnHover,
} from "@/lib/motion";

describe("motion presets", () => {
  describe("tiltOnHover", () => {
    it("has whileHover with rotate and scale", () => {
      expect(tiltOnHover.whileHover).toEqual({ rotate: 2, scale: 1.03 });
    });

    it("has spring transition", () => {
      expect(tiltOnHover.transition).toMatchObject({
        type: "spring",
        stiffness: 300,
        damping: 20,
      });
    });
  });

  describe("sparklePulse", () => {
    it("has animate with opacity and scale arrays", () => {
      expect(sparklePulse.animate).toEqual({
        opacity: [0, 1, 0],
        scale: [0.8, 1.2, 0.8],
      });
    });

    it("has infinite repeat transition", () => {
      expect(sparklePulse.transition).toMatchObject({
        duration: 1.6,
        repeat: Infinity,
        ease: "easeInOut",
      });
    });
  });

  describe("bannerEntrance", () => {
    it("has initial state with y offset and opacity 0", () => {
      expect(bannerEntrance.initial).toEqual({ y: 40, opacity: 0 });
    });

    it("has animate target with y 0 and opacity 1", () => {
      expect(bannerEntrance.animate).toEqual({ y: 0, opacity: 1 });
    });

    it("has custom ease curve", () => {
      expect(bannerEntrance.transition).toMatchObject({
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      });
    });
  });

  describe("marqueeDrift", () => {
    it("animates x from 0% to -50%", () => {
      expect(marqueeDrift.animate).toEqual({ x: ["0%", "-50%"] });
    });

    it("has linear infinite transition", () => {
      expect(marqueeDrift.transition).toMatchObject({
        duration: 22,
        ease: "linear",
        repeat: Infinity,
      });
    });
  });

  describe("parallaxFloat", () => {
    it("maps 0 to -40", () => {
      expect(parallaxFloat(0)).toBe(-40);
    });

    it("maps 0.5 to 0", () => {
      expect(parallaxFloat(0.5)).toBe(0);
    });

    it("maps 1 to 40", () => {
      expect(parallaxFloat(1)).toBe(40);
    });
  });
});
