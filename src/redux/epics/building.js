import Building from "../../models/building";
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/delay';

const model = new Building()

export default (action$, store) =>
  action$
    .ofType(`PERSIST_NEW_${model.name.toUpperCase()}`)
    .delay(1000)
    .mapTo({
      type: `SUCCESSFULLY_PERSIST_NEW_${model.name.toUpperCase()}`
    })
