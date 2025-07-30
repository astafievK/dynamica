import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "../../CustomDefaultComponents/Dropdown/Dropdown.tsx";
import { BannerNoData } from "../../BannerNoData/BannerNoData.tsx";
import { LinkShowMore } from "../../PageProfile/ButtonShowMore/LinkShowMore.tsx";
import { FilterOption } from "../../../types/FilterOption.ts";
import "./WidgetTemplate.css"

export type WidgetTemplateProps<T> = {
    title: string;
    linkTo: string;
    data: T[];
    filters: {
        label: string;
        options: FilterOption[];
        selected: FilterOption;
        onChange: (val: FilterOption) => void;
    }[];
    filteredItems: T[];
    renderItem: (item: T) => React.ReactNode;
    emptyMessage: string;
    gridClass: string;
    widgetClass: string;
    queryLimit?: number;
    actions?: React.ReactNode;
};

export function WidgetTemplate<T>({
                                      title,
                                      linkTo,
                                      data,
                                      filters,
                                      filteredItems,
                                      renderItem,
                                      emptyMessage,
                                      gridClass,
                                      widgetClass,
                                      queryLimit,
                                      actions,
                                  }: WidgetTemplateProps<T>) {
    return (
        <div className={`widget ${widgetClass}`}>
            <div className="widget__header">
                <Link to={linkTo} className="widget__title">{title}</Link>
                <div className="widget__controls">
                    {
                        actions && <div className="widget__actions">{actions}</div>
                    }
                    <div className="widget__filters">

                        {filters.map((filter, index) => (
                            <Dropdown
                                key={index}
                                label={filter.label}
                                options={filter.options}
                                value={filter.selected}
                                onSelect={filter.onChange}
                                externalClasses={[]}
                                searchEnabled={false}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="widget__body">
                {filteredItems.length === 0 ? (
                    <BannerNoData content={emptyMessage} />
                ) : (
                    <div className={gridClass}>
                        {filteredItems.map(renderItem)}
                    </div>
                )}
            </div>
            {
                (queryLimit && (data.length === queryLimit)) && (
                    <LinkShowMore linkTo={linkTo} />
                )
            }
        </div>
    );
}
