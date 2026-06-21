"use client";

import jsPDF from "jspdf";

export default function ExportPDFButton() {
  const handleExportPDF = async () => {
    try {
      const pdf = new jsPDF();

      // Title
      pdf.setFontSize(22);
      pdf.setTextColor(15, 15, 15);
      pdf.text("Financial Insights Report", 20, 25);

      // Subtitle
      pdf.setFontSize(11);
      pdf.setTextColor(100);
      pdf.text("Generated from FinanceFlow Dashboard", 20, 35);

      // Divider
      pdf.line(20, 42, 190, 42);

      // Section Title
      pdf.setFontSize(16);
      pdf.setTextColor(0);
      pdf.text("Dashboard Summary", 20, 55);

      // Sample dashboard data summary
      pdf.setFontSize(12);

      pdf.text("• Portfolio performance overview", 25, 70);
      pdf.text("• Financial health insights", 25, 82);
      pdf.text("• Goal tracking progress", 25, 94);
      pdf.text("• Learning & activity analytics", 25, 106);

      // Footer
      pdf.setFontSize(10);
      pdf.setTextColor(120);
      pdf.text(
        `Generated on ${new Date().toLocaleDateString()}`,
        20,
        280
      );

      const timestamp = new Date().toISOString().split("T")[0];
      pdf.save(`financial-report-${timestamp}.pdf`);
    } catch (error) {
      console.error("PDF export failed:", error);
    }
  };

  return (
    <button
      onClick={handleExportPDF}
      className="px-4 py-2 rounded-xl bg-[#0F0F0F] text-white dark:bg-[#f3efe3] dark:text-[#091116] text-sm font-medium hover:opacity-90 transition-all"
    >
      Export Report PDF
    </button>
  );
}