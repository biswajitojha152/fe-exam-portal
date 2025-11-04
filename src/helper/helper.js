import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { PASSED } from "./constants";
import moment from "moment";

export function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60),
    remainingMinutes = minutes % 60;

  return `${hours}hr ${
    remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes
  }min`;
}

export function formatSecondsWithSuffix(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts = [];
  if (hrs > 0) parts.push(`${hrs} hr${hrs > 1 ? "s" : ""}`);
  if (mins > 0) parts.push(`${mins} min${mins > 1 ? "s" : ""}`);
  if (secs > 0 || parts.length === 0)
    parts.push(`${secs} sec${secs > 1 ? "s" : ""}`);

  return parts.join(" ");
}

export function toLetters(num) {
  const mod = num % 26;
  let pow = (num / 26) | 0;
  const out = mod ? String.fromCharCode(64 + mod) : (--pow, "Z");
  return pow ? toLetters(pow) + out : out;
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function isSubstringMatch(string, subString) {
  return new RegExp(escapeRegExp(subString), "i").test(string);
}

export const downloadResultPDF = (result) => {
  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("Quiz Result", 105, 20, { align: "center" });

  doc.setLineWidth(0.5);
  doc.line(20, 25, 190, 25);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Username: ${result.username}`, 20, 35);
  doc.text(`Quiz Title: ${result.quizDTO.name}`, 20, 45);
  doc.text(`Category: ${result.quizDTO.categoryName}`, 20, 55);
  doc.text(
    `Date: ${moment(result.attemptedAt).format("DD MMM YYYY, hh:mmA")}`,
    20,
    65
  );

  doc.line(20, 75, 190, 75);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Score Summary", 20, 90);

  autoTable(doc, {
    startY: 95,
    head: [["Score", "Percentage", "Status"]],
    body: [
      [
        `${result.correctAnswer}/${result.totalQuestions}`,
        `${(result.correctAnswer / result.totalQuestions) * 100}%`,
        result.status,
      ],
    ],
    theme: "striped",
    styles: {
      halign: "center",
      fontSize: 12,
      cellPadding: 6,
    },
    headStyles: {
      fillColor: result.status === PASSED ? [76, 175, 80] : [244, 67, 54],
      textColor: [255, 255, 255],
    },
  });

  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text("Thank you for participating!", 105, 280, { align: "center" });

  doc.save(`${result.quizDTO.name}_result.pdf`);
};
