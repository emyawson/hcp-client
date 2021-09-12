export interface SetIn {
  <O, K1 extends keyof O>(path: [K1], val: O[K1], object: O): O;
  <O, K1 extends keyof O, K2 extends keyof O[K1]>(
    path: [K1, K2],
    val: O[K1][K2],
    o: O,
  ): O;
  <O, K1 extends keyof O, K2 extends keyof O[K1], K3 extends keyof O[K1][K2]>(
    path: [K1, K2, K3],
    val: O[K1][K2][K3],
    o: O,
  ): O;
  <
    O,
    K1 extends keyof O,
    K2 extends keyof O[K1],
    K3 extends keyof O[K1][K2],
    K4 extends keyof O[K1][K2][K3]
  >(
    path: [K1, K2, K3, K4],
    val: O[K1][K2][K3][K4],
    o: O,
  ): O;
  <
    O,
    K1 extends keyof O,
    K2 extends keyof O[K1],
    K3 extends keyof O[K1][K2],
    K4 extends keyof O[K1][K2][K3],
    K5 extends keyof O[K1][K2][K3][K4]
  >(
    path: [K1, K2, K3, K4, K5],
    val: O[K1][K2][K3][K4][K5],
    o: O,
  ): O;
}
