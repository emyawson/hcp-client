// import { isTimeWithinInterval, isDatetimeWithinInterval } from "../time";

// describe("isTimeWithinInterval util", () => {
//   it("should return true when interval 20:00-22:00 and dateTime is 21:30", () => {
//     const targetDateTime = "21:30:00";
//     const startTime = "20:00:00";
//     const endTime = "22:00:00";
//     const actual = isTimeWithinInterval(targetDateTime, startTime, endTime);
//     expect(actual).toBeTruthy();
//   });
//   it("should return true when interval 22:00-00:00 and dateTime is 23:00", () => {
//     const targetTime = "23:30:00";
//     const startTime = "22:00:00";
//     const endTime = "00:00:00";
//     const actual = isTimeWithinInterval(targetTime, startTime, endTime);
//     expect(actual).toBeTruthy();
//   });
//   it("should return false when interval 22:00-00:00 and dateTime is 21:00", () => {
//     const targetTime = "21:00:00";
//     const startTime = "22:00:00";
//     const endTime = "00:00:00";
//     const actual = isTimeWithinInterval(targetTime, startTime, endTime);
//     expect(actual).toBeFalsy();
//   });
//   it("should return false when interval 22:00-00:00 and dateTime is 2:00", () => {
//     const targetTime = "2:00:00";
//     const startTime = "22:00:00";
//     const endTime = "00:00:00";
//     const actual = isTimeWithinInterval(targetTime, startTime, endTime);
//     expect(actual).toBeFalsy();
//   });
//   it("should return true when interval 22:00-1:00 and dateTime is 23:00", () => {
//     const targetTime = "23:00:00";
//     const startTime = "22:00:00";
//     const endTime = "01:00:00";
//     const actual = isTimeWithinInterval(targetTime, startTime, endTime);
//     expect(actual).toBeTruthy();
//   });
//   it("should return false when interval 22:00-1:00 and dateTime is 21:00", () => {
//     const targetTime = "21:00:00";
//     const startTime = "22:00:00";
//     const endTime = "01:00:00";
//     const actual = isTimeWithinInterval(targetTime, startTime, endTime);
//     expect(actual).toBeFalsy();
//   });
//   it("should return true when interval 22:00-1:00 and dateTime is 00:30", () => {
//     const targetTime = "00:30:00";
//     const startTime = "22:00:00";
//     const endTime = "01:00:00";
//     const actual = isTimeWithinInterval(targetTime, startTime, endTime);
//     expect(actual).toBeTruthy();
//   });
//   it("should return false when interval 22:00-1:00 and dateTime is 1:30", () => {
//     const targetTime = "1:30:00";
//     const startTime = "22:00:00";
//     const endTime = "01:00:00";
//     const actual = isTimeWithinInterval(targetTime, startTime, endTime);
//     expect(actual).toBeFalsy();
//   });
// });

// describe("isDatetimeWithinInterval", () => {
//   it("should return false when interval 22:00-1:00 and dateTime is Mon Jan 08 2018 1:30:00", () => {
//     const targetTime = "Mon Jan 08 2018 1:30:00";
//     const startTime = "22:00:00";
//     const endTime = "01:00:00";
//     const actual = isDatetimeWithinInterval(targetTime, startTime, endTime);
//     expect(actual).toBeFalsy();
//   });
//   it("should return true when interval 22:00-1:00 and dateTime is Mon Jan 08 2018 00:30:00", () => {
//     const targetTime = "Mon Jan 08 2018 00:30:00";
//     const startTime = "22:00:00";
//     const endTime = "01:00:00";
//     const actual = isDatetimeWithinInterval(targetTime, startTime, endTime);
//     expect(actual).toBeTruthy();
//   });
// });
describe('is a dummy test suite', () => {
  it('should pass', () => {
    console.log('Remove this!');
  });
});
