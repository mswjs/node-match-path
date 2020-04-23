import { Path, match } from '../../src/match'

export interface Scenario {
  given: Path
  when: Array<{
    actual: string
    it: {
      [key: string]: any
    } & ReturnType<typeof match>
  }>
}

export const runner = (name: string, scenarios: Scenario[]) => {
  describe(name, () => {
    scenarios.forEach((scenario) => {
      describe(`given "${scenario.given}" path`, () => {
        scenario.when.forEach((data) => {
          describe(`and "${data.actual}" url`, () => {
            let result: ReturnType<typeof match>

            beforeAll(() => {
              result = match(scenario.given, data.actual)
            })

            Object.entries(data.it).forEach(([key, expectedValue]) => {
              it(`"${key}": "${JSON.stringify(expectedValue)}"`, () => {
                expect(result).toHaveProperty(key, expectedValue)
              })
            })
          })
        })
      })
    })
  })
}
