import {
  bannerEntrance,
  marqueeDrift,
  parallaxFloat,
  sparklePulse,
  tiltOnHover,
} from "@/lib/motion";

describe("motion presets", () => {
  describe("tiltOnHover", () => {
    test("has whileHover with rotate and scale", () => {
      expect(tiltOnHover.whileHover).toEqual({ rotate: 2, scale: 1.03 });
    });

    test("uses spring transition", () => {
      expect(tiltOnHover.transition).toMatchObject({
        type: "spring",
        stiffness: 300,
        damping: 20,
      });
    });
  });

  describe("sparklePulse", () => {
    test("animates opacity and scale arrays", () => {
      expect(sparklePulse.animate).toEqual({
        opacity: [0, 1, 0],
        scale: [0.8, 1.2, 0.8],
      });
    });

    test("has infinite repeat with correct duration", () => {
      expect(sparklePulse.transition).toMatchObject({
        duration: 1.6,
        repeat: Infinity,
        ease: "easeInOut",
      });
    });
  });

  describe("bannerEntrance", () => {
    test("has initial state with y offset and zero opacity", () => {
      expect(bannerEntrance.initial).toEqual({ y: 40, opacity: 0 });
    });

    test("animates to y=0 and full opacity", () => {
      expect(bannerEntrance.animate).toEqual({ y: 0, opacity: 1 });
    });

    test("has correct transition", () => {
      expect(bannerEntrance.transition).toEqual({
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      });
    });
  });

  describe("marqueeDrift", () => {
    test("animates x from 0% to -50%", () => {
      expect(marqueeDrift.animate).toEqual({ x: ["0%", "-50%"] });
    });

    test("has linear infinite transition", () => {
      expect(marqueeDrift.transition).toMatchObject({
        duration: 22,
        ease: "linear",
        repeat: Infinity,
      });
    });
  });

  describe("parallaxFloat", () => {
    test("maps 0 to -40", () => {
      expect(parallaxFloat(0)).toBe(-40);
    });

    test("maps 0.5 to 0", () => {
      expect(parallaxFloat(0.5)).toBe(0);
    });

    test("maps 1 to 40", () => {
      expect(parallaxFloat(1)).toBe(40);
    });

    test("linearly interpolates mid-values", () => {
      expect(parallaxFloat(0.25)).toBeCloseTo(-20, 5);
      expect(parallaxFloat(0.75)).toBeCloseTo(20, 5);
    });
  });
});
