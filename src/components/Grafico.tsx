/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const COLORS: Record<string, string> = {
    asistencia: "#22c55e", // verde
    inasistencia_injustificada: "#ef4444", // rojo
    inasistencia_justificada: "#eab308", // amarillo
    retraso: "#3b82f6", // azul
};

type Props = {
    data: {
        tipo_ajustado: string;
        porcentaje: string;
    }[];
};

export function GraficoPastelAsistencia({ data }: Props) {
    const chartData = data.map((item) => ({
        name: item.tipo_ajustado,
        value: parseFloat(item.porcentaje),
        tipo: item.tipo_ajustado,
    }));

    return (
        <div className="w-full h-[220px]">
            <h3 className="text-center text-sm font-semibold  mb-2">
                Distribución de Asistencia
            </h3>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        isAnimationActive={false}
                        labelLine={false}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[entry.tipo] || "#ccc"} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value: any, _name: any, props: any) => {
                            const formatted = `${value.toFixed(1)}%`;
                            const label = {
                                asistencia: "Asistencia",
                                inasistencia_justificada: "Inasistencia Justificada",
                                inasistencia_injustificada: "Inasistencia Injustificada",
                                retraso: "Tardanza",
                            }[props.payload.tipo as string];
                            return [formatted, label];
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
