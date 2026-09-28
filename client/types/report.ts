import { ReportSnapshot } from "./report-snapshot";
import { ResultType } from "./result-types";

export interface ReportDTO {
    id: string;
    visitorToken: string;
    totalScore: number;
    scorePercent: number;
    resultType: ResultType;
    reportSnapshot: ReportSnapshot;
    completedAt: string;
}

export class Report {
    id: string;
    visitorToken: string;
    totalScore: number;
    scorePercent: number;
    resultType: ResultType;
    reportSnapshot: ReportSnapshot;
    completedAt: Date;

    constructor(dto: ReportDTO) {
        this.id = dto.id;
        this.visitorToken = dto.visitorToken;
        this.totalScore = dto.totalScore;
        this.scorePercent = dto.scorePercent;
        this.resultType = dto.resultType;
        this.reportSnapshot = dto.reportSnapshot;
        this.completedAt = new Date(dto.completedAt);
    }

    getTraitLevel(): string {
        if (this.resultType === ResultType.HIGH_ADHD_TRAITS) {
            return "High ADHD Traits";
        } else if (this.resultType === ResultType.LOW_ADHD_TRAITS) {
            return "Low ADHD Traits";
        } else {
            return "Unknown";
        }
    }
}