export const classlist = (list: string[], item: any) => {
  const style: { [key: string]: any } = item.style  ? item.style : {};
  const grid = item.grid;

  if (grid != null) {
    for (const info of grid) {
      style[`--${info.size}_rstart`] = info.row_start;
      style[`--${info.size}_cstart`] = info.col_start;
      switch (info.size) {
        case "sm": {
          if (info.row_start != null) {
            list.push("row-start-(--sm_rstart)");
          }
          if (info.col_start != null) {
            list.push("col-start-(--sm_cstart)");
          }
          if (info.row_span) {
            if (info.row_span == -1) {
              list.push("row-span-full");
            } else {
              list.push("row-span-(--sm_rspan)");
              style["--sm_rspan"] = info.row_span;
            }
          }

          if (info.col_span) {
            if (info.col_span == -1) {
              list.push("col-span-full");
            } else {
              list.push("col-span-(--sm_cspan)");
              style["--sm_cspan"] = info.col_span;
            }
          }
          break;
        }

        case "md": {
          if (info.row_start != null) {
            list.push("md:row-start-(--md_rstart)");
          }
          if (info.col_start != null) {
            list.push("md:col-start-(--md_cstart)");
          }
          if (info.row_span) {
            if (info.row_span == -1) {
              list.push("md:row-span-full");
            } else {
              list.push("md:row-span-(--md_rspan)");
              style["--md_rspan"] = info.row_span;
            }
          }

          if (info.col_span) {
            if (info.col_span == -1) {
              list.push("md:col-span-full");
            } else {
              list.push("md:col-span-(--md_cspan)");
              style["--md_cspan"] = info.col_span;
            }
          }
          break;
        }

        case "lg": {
          if (info.row_start != null) {
            list.push("xl:row-start-(--lg_rstart)");
          }
          if (info.col_start != null) {
            list.push("xl:col-start-(--lg_cstart)");
          }
          if (info.row_span) {
            if (info.row_span == -1) {
              list.push("xl:row-span-full");
            } else {
              list.push("xl:row-span-(--lg_rspan)");
              style["--lg_rspan"] = info.row_span;
            }
          }

          if (info.col_span) {
            if (info.col_span == -1) {
              list.push("xl:col-span-full");
            } else {
              list.push("xl:col-span-(--lg_cspan)");
              style["--lg_cspan"] = info.col_span;
            }
          }
          break;
        }

        case "xl": {
          if (info.row_start != null) {
            list.push("2xl:row-start-(--xl_rstart)");
          }
          if (info.col_start != null) {
            list.push("2xl:col-start-(--xl_cstart)");
          }
          if (info.row_span) {
            if (info.row_span == -1) {
              list.push("2xl:row-span-full");
            } else {
              list.push("2xl:row-span-(--xl_rspan)");
              style["--xl_rspan"] = info.row_span;
            }
          }

          if (info.col_span) {
            if (info.col_span == -1) {
              list.push("2xl:col-span-full");
            } else {
              list.push("2xl:col-span-(--xl_cspan)");
              style["--xl_cspan"] = info.col_span;
            }
          }
          break;
        }
      }
    }

    if (item.row_span) {
      if (item.row_span == -1) {
        list.push("row-span-full");
      } else {
        list.push("row-span-(--rspan)");
        style["--rspan"] = item.row_span;
      }
    }

    if (item.col_span) {
      if (item.col_span == -1) {
        list.push("col-span-full");
      } else {
        list.push("col-span-(--cspan)");
        style["--cspan"] = item.col_span;
      }
    }
  }
  return { list, style };
};
