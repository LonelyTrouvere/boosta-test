import { Sections } from "@/types/sections";
import React from "react";

export default abstract class Report {
  abstract getFaq(): React.ReactNode;
  abstract getStrenghts(): React.ReactNode;
  abstract getUnderstanding(): React.ReactNode;
  abstract getRegulation(): React.ReactNode;

  private mapping: Record<Sections, () => React.ReactNode> = {
    [Sections.UNDERSTANDING]: this.getUnderstanding,
    [Sections.FAQ]: this.getFaq,
    [Sections.STRENGTHS]: this.getStrenghts,
    [Sections.REGULATION]: this.getRegulation,
  };

  public getComposed(sections?: string[] | null): React.ReactNode[] {
    if (!Array.isArray(sections)) {
      return [];
    }

    return sections
      .map((sect, index) => {
        const renderer = this.mapping[sect as Sections];
        if (typeof renderer !== "function") return null;

        const node = renderer();

        return <React.Fragment key={`${sect}-${index}`}>{node}</React.Fragment>;
      })
      .filter((node)=> node !== null);
  }
}