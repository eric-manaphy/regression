// Using var is a bad idea generally but there's no real point
// in messing with code from a client's perspective,
// malicious or not -- though I'll probably just throw it into the handler
var curves = {
    uni_uni: ["KA", "Vmax"],
    uni_uni_comp_inhib: ["KA", "KI", "Vmax"],
    ping_pong_bi_bi: ["KA", "KB", "Vmax"],
    ordered_bi_bi: ["KA", "KiA", "KB", "Vmax"],
    ordered_ter_ter: ["KA", "KiA", "KB", "KiB", "KC", "Vmax"],
    bi_uni_uni_uni_ping_pong: ["KA", "KIA", "KB", "KC", "Vmax"],
};