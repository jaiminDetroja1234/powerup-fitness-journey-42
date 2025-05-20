
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WeeklyActivity } from "@/data/userStats";

interface ActivityChartProps {
  data: WeeklyActivity[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-md p-2 shadow-sm">
        <p className="font-medium">{label}</p>
        <p className="text-sm text-primary">{`${payload[0].value} minutes`}</p>
        <p className="text-sm text-powerBlue">{`${payload[1].value} calories`}</p>
      </div>
    );
  }
  return null;
};

const ActivityChart = ({ data }: ActivityChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Activity</CardTitle>
        <CardDescription>Your workout minutes and calories burned</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="left" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar yAxisId="left" dataKey="minutes" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="calories" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityChart;
