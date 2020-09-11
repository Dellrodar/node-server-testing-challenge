const supertest = require("supertest")
const server = require("../server")
const db = require("../data/config")

beforeEach(async () => {
	await db.seed.run()
})

afterAll(async () => {
	await db.destroy()
})

describe("user integration tests", () => {
    it("GET /users", async () => {
		const res = await supertest(server).get("/users")
		expect(res.statusCode).toBe(200)
		expect(res.type).toBe("application/json")
		expect(res.body.length).toBeGreaterThanOrEqual(3)
		expect(res.body[0].name).toBe("Emilio")
	})
	it("GET /users", async () => {
		const res = await supertest(server).get("/users")
		expect(res.statusCode).toBe(200)
		expect(res.type).toBe("application/json")
		expect(res.body.length).toBeGreaterThanOrEqual(3)
		expect(res.body[2].name).toBe("Melissa")
	})

	it("GET /users/:id", async () => {
		const res = await supertest(server).get("/users/2")
		expect(res.statusCode).toBe(200)
		expect(res.type).toBe("application/json")
		expect(res.body.name).toBe("Jenn")
	})
	it("GET /users/:id", async () => {
		const res = await supertest(server).get("/users/2")
		expect(res.statusCode).toBe(200)
		expect(res.type).toBe("application/json")
		expect(res.body.userName).toBe("Jennoula")
	})

	it("GET /users/:id - not found", async () => {
		const res = await supertest(server).get("/users/50")
		expect(res.statusCode).toBe(404)
	})

	it("POST /users", async () => {
		const res = await supertest(server)
			.post("/users")
			.send({ userName: "Bilbo", name: "Mr.Baggins" })
		expect(res.statusCode).toBe(201)
		expect(res.type).toBe("application/json")
		expect(res.body.userName).toBe("Bilbo")
	})

	it("POST /users", async () => {
		const res = await supertest(server)
			.post("/users")
			.send({ userName: "Goku", name: "Kakarot" })
		expect(res.statusCode).toBe(201)
		expect(res.type).toBe("application/json")
		expect(res.body.name).toBe("Kakarot")
	})

	it("DELETE /users/:id", async () => {
		const res = await supertest(server)
		.delete("/users/2")
		expect(res.statusCode).toBe(201)
		expect(res.body.message).toBe("The user has been removed.")
	})

	it("DELETE /users/:id", async () => {
		const res = await supertest(server)
		.delete("/users/57")
		expect(res.statusCode).toBe(404)
	})
})