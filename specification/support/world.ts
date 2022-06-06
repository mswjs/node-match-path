import { setWorldConstructor } from '@cucumber/cucumber'
import { Path, Match, match } from '../../src'

class CustomWorld {
  public path: Path
  public url: string
  public result: Match

  match() {
    this.result = match(this.path, this.url)
  }
}

setWorldConstructor(CustomWorld)
