export interface Subject {
  _id: string;
  name: string;
  icon: string;
  createdAt: string; // ISO date string
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}

export interface GetSubjectsResponse {
  message: string; // e.g. "success"
  metadata: Metadata;
  subjects: Subject[];
}
