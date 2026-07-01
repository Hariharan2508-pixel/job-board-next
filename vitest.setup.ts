import "@testing-library/jest-dom/vitest";
import "./src/test/setup";
import { expect } from "vitest";
import { toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);