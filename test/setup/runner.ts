import { Path, match } from '../../src/match'

export interface Scenario {
  given: Path
  when: Array<{
    only?: boolean
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
            const test = data.only ? it.only : it

            Object.entries(data.it).forEach(([key, expectedValue]) => {
              test(`"${key}": "${JSON.stringify(expectedValue)}"`, () => {
                const result = match(scenario.given, data.actual)
                expect(result).toHaveProperty(key, expectedValue)
              })
            })
          })
        })
      })
    })
  })
}
