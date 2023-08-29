export interface TreeNode {
    id: number;
    name: string;
    level?: number;
    children?: TreeNode[];
  }