import Collection from "../../entities/collection";
import { Factory } from "./base";

const CollectionFactory = new Factory<Collection>((data) => (new Collection({
    name: 'fake-collection',
    path: '/collection-01',
    ...data
})))

export default CollectionFactory