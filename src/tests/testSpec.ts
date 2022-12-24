import path from "path";
import { Order } from "../models/order";
import { Product } from "../models/product";
import { User, UserModel } from "../models/users";

const userStore = new User();

describe("Testing User db model", () => {
  it("should have index method", async () => {
    expect(userStore.index).toBeDefined();
  });

  it("should have show method", async () => {
    expect(userStore.show).toBeDefined();
  });

  it("should have create method", async () => {
    expect(userStore.create).toBeDefined();
  });

  it("should add new user method", async () => {
    const user: UserModel = {
      firstName: "Faisal1",
      lastName: "Alowaini",
      password: "test",
    };

    const result = await userStore.create(user);
    expect(result).toBeDefined();

    expect(result).toBeDefined();
  });

});

const productStore = new Product();

describe("Testing product db model", () => {
  it("should have index method", async () => {
    expect(productStore.index).toBeDefined();
  });

  it("should have show method", async () => {
    expect(productStore.show).toBeDefined();
  });

  it("should have create method", async () => {
    expect(productStore.create).toBeDefined();
  });
});

const orderStore = new Order();

describe("Testing order db model", () => {
  it("should have show method", async () => {
    expect(orderStore.show).toBeDefined();
  });
});
