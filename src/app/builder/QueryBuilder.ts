import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchAbleField: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchAbleField.map(
          (field: string) =>
            ({
              [field]: { $regex: searchTerm, $options: "i" },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };

    const excludeField = ["searchTerm", "sort", "limit", "page", "fields"];
    excludeField.forEach((el) => delete queryObj[el]); // deleting the partial values item

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(",")?.join(" ") || "-createdAt";

    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = Number(page - 1) * limit || 0;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fieldLimiting() {
    const fields =
      (this?.query?.fields as string)?.split(",")?.join(" ") || "-__v";

    this.modelQuery = this.modelQuery.select(fields);

    return this;
  }

  async countTotal() {
    const query = this.modelQuery.getFilter();
    const countDocs = await this.modelQuery.model.countDocuments(query);

    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;

    const totalPage = Math.ceil(countDocs / limit);

    return {
      totalPage,
      countDocs,
      page,
      limit,
    };
  }
}

export default QueryBuilder;
