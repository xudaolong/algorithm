import rewire from "rewire"
const btPowerSet = rewire("./btPowerSet")
const btPowerSetRecursive = btPowerSet.__get__("btPowerSetRecursive")
// @ponicode
describe("btPowerSetRecursive", () => {
    test("0", () => {
        let callFunction: any = () => {
            btPowerSetRecursive("^5.0.0", 1000, -5.48, 0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            btPowerSetRecursive("^5.0.0", "£", [], 30)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            btPowerSetRecursive("4.0.0-beta1\t", true, [], 1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let param2: any = [[], []]
        let callFunction: any = () => {
            btPowerSetRecursive("1.0.0", param2, "1.0.0", 70)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let param2: any = [[], []]
        let callFunction: any = () => {
            btPowerSetRecursive("^5.0.0", param2, "v4.0.0-rc.4", 520)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            btPowerSetRecursive([], "", "", Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})
