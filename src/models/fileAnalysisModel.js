export default class EngineResultModel {
  constructor({ category, engine_name, ...args }) {
    this.category = category;
    this.engine_name = engine_name;
    this.more = { ...args };
    return this.cleanNullValue();
  }
  cleanNullValue() {
    return JSON.parse(
      JSON.stringify(this, (_, value) => (value === null ? '' : value))
    );
  }

  static createTableData(rawJson) {
    return Object.values(rawJson.attributes.results).map(
      (results) => new this(results)
    );
  }
}
