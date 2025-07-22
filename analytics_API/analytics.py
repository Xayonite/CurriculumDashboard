import pandas as pd
import matplotlib.pyplot as plt
import os

STATIC_DIR = "graphRepo"
os.makedirs(STATIC_DIR, exist_ok=True)

def analyze_excel(file_path: str):
    df = pd.read_excel(file_path, header=None)
    skills = df.iloc[0, 4:].tolist()
    checked_matrix = df.iloc[2:-1, 4:]
    check_counts = checked_matrix.apply(lambda col: col.astype(str).str.contains('✔').sum(), axis=0)
    check_counts.index = skills
    total_courses = 55

    skill_distribution = pd.DataFrame({
        'Skill': skills,
        'Check Count': check_counts.values
    }).dropna()
    skill_distribution['Percentage'] = (skill_distribution['Check Count'] / total_courses) * 100
    skill_distribution['Skill'] = pd.Categorical(skill_distribution['Skill'], categories=skills, ordered=True)
    skill_distribution = skill_distribution.sort_values('Skill')

    well_covered = skill_distribution[skill_distribution['Percentage'] >= 30]['Skill'].tolist()
    low_coverage = skill_distribution[(skill_distribution['Percentage'] < 30) & (skill_distribution['Percentage'] > 0)]['Skill'].tolist()
    gaps = skill_distribution[skill_distribution['Percentage'] == 0]['Skill'].tolist()

    totals_row = df.iloc[-1, 4:]
    totals_list = [str(x).strip() for x in totals_row.tolist()]
    try:
        green_index = totals_list.index("Sum of Green:")
        red_index = totals_list.index("Sum of Red:")
        green_total = pd.to_numeric(totals_list[green_index + 1], errors='coerce')
        red_total = pd.to_numeric(totals_list[red_index + 1], errors='coerce')
    except ValueError:
        green_total = 0
        red_total = 0

    ratio_of_focus = green_total / red_total if red_total else 0

    # Plot 1: Bar Chart
    bar_path = os.path.join(STATIC_DIR, "bar_chart.png")
    plt.figure(figsize=(16, 7))
    bars = plt.bar(skill_distribution['Skill'], skill_distribution['Percentage'],
                   color=['green' if p >= 30 else 'orange' if p > 0 else 'red' for p in skill_distribution['Percentage']])
    for bar, pct in zip(bars, skill_distribution['Percentage']):
        plt.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 1, f'{pct:.1f}%', ha='center')
    plt.title('Distribution Across Courses')
    plt.ylabel('Coverage (%)')
    plt.xticks(rotation=45, ha='right')
    plt.ylim(0, 120)
    plt.grid(axis='y', linestyle='--', alpha=0.6)
    plt.tight_layout()
    plt.savefig(bar_path)
    plt.close()

    # Plot 2: Line Chart
    checked_matrix = df.iloc[2:, 4:]
    first_year = checked_matrix.iloc[0:14]
    second_year = checked_matrix.iloc[14:28]
    third_year = checked_matrix.iloc[28:41]
    fourth_year = checked_matrix.iloc[41:55]

    def calculate_percentages(df_slice):
        return df_slice.apply(lambda col: col.astype(str).str.contains('✔').sum(), axis=0) / len(df_slice) * 100

    first = calculate_percentages(first_year)
    second = calculate_percentages(second_year)
    third = calculate_percentages(third_year)
    fourth = calculate_percentages(fourth_year)

    line_df = pd.DataFrame({
        'End of 1st Year': first.values,
        'End of 2nd Year': second.values,
        'End of 3rd Year': third.values,
        'End of 4th Year': fourth.values
    }, index=skills)

    line_path = os.path.join(STATIC_DIR, "line_chart.png")
    plt.figure(figsize=(14, 6))
    for column in line_df.columns:
        plt.plot(line_df.index, line_df[column], marker='o', label=column)
    plt.title("Progression of Skills Focus")
    plt.xlabel("Skills")
    plt.ylabel("Percentage (%)")
    plt.xticks(rotation=45, ha='right')
    plt.ylim(0, 120)
    plt.grid(True, linestyle='--', alpha=0.6)
    plt.legend()
    plt.tight_layout()
    plt.savefig(line_path)
    plt.close()

    return {
        "well_covered": well_covered,
        "low_coverage": low_coverage,
        "gaps": gaps,
        "ratio_of_focus": ratio_of_focus,
        "bar_chart_path": bar_path,
        "line_chart_path": line_path
    }
