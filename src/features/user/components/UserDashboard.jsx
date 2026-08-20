import { useState } from "react";
import { Users, Loader2 } from "lucide-react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import useCountUserByMonth from "../hooks/useCountUserByMonth";

const UserDashboard = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const { data: usersByMonth, isLoading } = useCountUserByMonth(year);

  const years = Array.from(
    { length: currentYear - 2023 },
    (_, i) => currentYear - i,
  );

  return (
    <div className="flex flex-col bg-white border border-slate-200 rounded-card shadow-card p-5 md:p-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-primary-50 rounded-btn border border-primary-100">
            <Users className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg">Người dùng</h3>
            <p className="text-xs font-medium text-slate-500">
              Số lượng người dùng mới theo tháng
            </p>
          </div>
        </div>

        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          disabled={isLoading}
          className="h-10 px-4 bg-slate-50 border border-slate-200 rounded-btn text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all cursor-pointer appearance-none min-w-[100px]"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              Năm {y}
            </option>
          ))}
        </select>
      </div>

      <div className="h-[300px] w-full mt-2 relative">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm z-10">
            <Loader2 className="w-8 h-8 animate-spin text-primary-500 mb-2" />
            <span className="text-sm font-medium text-slate-500">
              Đang tải dữ liệu biểu đồ...
            </span>
          </div>
        )}

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={usersByMonth || []}
            margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              itemStyle={{ fontWeight: "bold", color: "#4f46e5" }} // Hex của primary-600
              cursor={{
                stroke: "#cbd5e1",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />
            <Line
              type="monotone"
              dataKey="count"
              name="Người dùng mới"
              stroke="#4f46e5"
              strokeWidth={3}
              dot={{ r: 4, fill: "#ffffff", stroke: "#4f46e5", strokeWidth: 2 }}
              activeDot={{
                r: 6,
                fill: "#4f46e5",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserDashboard;
