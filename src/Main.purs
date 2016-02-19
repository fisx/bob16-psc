module Main
where

import Prelude
import Control.Monad.Eff
import Control.Monad.Eff.Console


main :: forall eff. Eff ( console :: CONSOLE | eff ) Unit
main = do
    log "hello, world!"
