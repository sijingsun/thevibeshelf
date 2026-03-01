import type { Database } from "./database";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Board = Database["public"]["Tables"]["boards"]["Row"];
export type Column = Database["public"]["Tables"]["columns"]["Row"];
export type Resource = Database["public"]["Tables"]["resources"]["Row"];
export type Upvote = Database["public"]["Tables"]["upvotes"]["Row"];
export type BoardContributor =
  Database["public"]["Tables"]["board_contributors"]["Row"];

// Rich app-level types
export interface ResourceWithUpvote extends Resource {
  userUpvoted?: boolean;
}

export interface ColumnWithResources extends Column {
  resources: ResourceWithUpvote[];
}

export interface BoardWithColumns extends Board {
  columns: ColumnWithResources[];
  owner?: Profile;
  _count?: {
    columns: number;
    resources: number;
  };
}

export interface BoardWithCounts extends Board {
  owner?: Profile;
  column_count?: number;
  resource_count?: number;
}
