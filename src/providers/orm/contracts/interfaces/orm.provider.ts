export interface OrmProvider {
  connect(): Promise<void>;
}
