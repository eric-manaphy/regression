// Okay I can literally just set this as the first script run lol
const curves = {
    uni_uni: ["KA", "Vmax"],
    uni_uni_comp_inhib: ["KA", "KI", "Vmax"],
    ping_pong_bi_bi: ["KA", "KB", "Vmax"],
    ordered_bi_bi: ["KA", "KiA", "KB", "Vmax"],
    ordered_ter_ter: ["KA", "KiA", "KB", "KiB", "KC", "Vmax"],
    bi_uni_uni_uni_ping_pong: ["KA", "KIA", "KB", "KC", "Vmax"],
};

const models = [
    ["uni_uni"],
    ["uni_uni_comp_inhib", "ping_pong_bi_bi", "ordered_bi_bi"],
    ["ordered_ter_ter", "bi_uni_uni_uni_ping_pong"]
];