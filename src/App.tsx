import { supabase } from './supabase';
import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2, VolumeX, Radio, Terminal as TermIcon, ExternalLink, X,
  Activity, Sun, Moon, Send, Sparkles, RefreshCw, Cpu,
  Globe2, ShieldAlert, ArrowUpRight, CheckCircle2, ChevronRight, Waves,
  BookOpen, ChevronDown, ChevronUp, Layers, Github
} from 'lucide-react';

interface GitHubProfile {
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  blog: string | null;
  twitter_username: string | null;
  html_url: string;
  public_repos: number;
  followers: number;
}

interface Specimen {
  id: string;
  code: string;
  tag: string;
  title: string;
  excerpt: string;
  fullData: {
    benthicDepth: string;
    protocol: string;
    frequency: string;
    cipher: string;
    analysis: string;
    logs: string[];
    waveformType: 'sub-bass' | 'whisper' | 'pulse';
  };
}

interface Transmission {
  id: string;
  sender: string;
  station: string;
  tag: string;
  message: string;
  timestamp: string;
  epochMs: number;
  echoCount: number;
  isUser?: boolean;
  isGitHubLive?: boolean;
}

const GITHUB_USERNAME = 'DeadProxy-Terin';

const SPECIMENS: Specimen[] = [
  {
    id: "SPECIMEN #01",
    code: "DRIFT-709",
    tag: "DRIFT",
    title: "Pelagic Trajectory",
    excerpt: "A wanderer across unindexed frequencies. Spending hours listening to obscure ambient soundscapes, deciphering systems, and enjoying the tranquility of low-bandwidth existence.",
    fullData: {
      benthicDepth: "3,840m // Abyssal Benthic Channel",
      protocol: "UDP / RAW WAVEGUIDE HOP-07",
      frequency: "432 Hz Sub-Harmonic Carrier",
      cipher: "SHA256: 7d4a...b891 [VERIFIED COLD]",
      analysis: "Subject exhibits prolonged residence in unmapped subnetworks. Ignores engagement metrics, preferring uninterrupted passive stream reception and ambient resonant architecture.",
      logs: [
        "04:12:08 UTC: Oceanic fiber relay intercepted. Wave packet jitter < 0.2ms.",
        "08:30:19 UTC: Low-frequency carrier detected. Echo trace matches benthic transponder.",
        "12:00:44 UTC: Zero telemetry drift recorded. Station remains moored."
      ],
      waveformType: 'sub-bass'
    }
  },
{
  id: "SPECIMEN #02",
  code: "IDENTITY-00",
  tag: "IDENTITY",
  title: "The Silent Proxy",
  excerpt: "A digital alias forged for virtual exploration. Neither broadcasting loud messages nor seeking recognition; merely logging existence across servers in the quiet hours.",
  fullData: {
    benthicDepth: "5,120m // Hadal Threshold",
    protocol: "ANONYMOUS CIRCUIT // HOP 04",
    frequency: "14.074 MHz FT8 Whisper",
    cipher: "GPG: DEAD-PROXY-ORIGIN-KEY",
    analysis: "Node operates in high-attenuation mode. The alias functions as an acoustic baffle against algorithmic noise, allowing consciousness to inhabit cyberspace as an observer rather than a content generator.",
    logs: [
      "01:14:22 UTC: Identity node activated without commercial telemetry.",
      "05:22:10 UTC: Packet payload: 0 bytes broadcast, 100% passive reception.",
      "19:40:02 UTC: Ghost node verified across 4 transoceanic gateways."
    ],
    waveformType: 'whisper'
  }
},
{
  id: "SPECIMEN #03",
  code: "EPOCH-2006",
  tag: "EPOCH",
  title: "2006 . 07 . 09",
  excerpt: "The temporal anchor of origin. Every passing second cataloged in real-time on the telemetry counter above—an ongoing, unhurried accumulation of biological runtime.",
  fullData: {
    benthicDepth: "0m (Physical Origin Coordinate)",
    protocol: "CHRONO-BIOLOGICAL UPTIME REGISTRY",
    frequency: "1.000 Hz Cardiac Clock",
    cipher: "EPOCH-TIMESTAMP: 1152403200",
    analysis: "Anchor initialized on July 9, 2006. Continuously running process. No system reboots or fatal memory leaks detected. Accumulating experience through quiet observation.",
    logs: [
      "00:00:00 UTC: Genesis timestamp logged into registry.",
      "06:28:13 UTC: Accumulating continuous uptime without pause.",
      "14:55:00 UTC: Telemetry delta refreshed every 30 milliseconds."
    ],
    waveformType: 'pulse'
  }
}
];

const INITIAL_WORLD_TRANSMISSIONS: Transmission[] = [
  {
    id: "tx-global-1",
    sender: "TOKYO_NODE_09",
    station: "EAST_PACIFIC // 4,200M",
    tag: "BEACON",
    message: "Signals from Shinjuku fiber cables descending into the Pacific trench. Noise floor nominal.",
    timestamp: "2 mins ago",
    epochMs: Date.now() - 120000,
    echoCount: 14
  },
{
  id: "tx-global-2",
  sender: "ARCTIC_SVALBARD",
  station: "GREENLAND_BASIN // 3,100M",
  tag: "DEEP_ECHO",
  message: "Cold water transmission received. Low latency verified via sub-polar relay.",
  timestamp: "8 mins ago",
  epochMs: Date.now() - 480000,
  echoCount: 29
},
{
  id: "tx-global-3",
  sender: "JAKARTA_GATEWAY",
  station: "SUNDA_TRENCH // 7,450M",
  tag: "HYDRO_VOICE",
  message: "Connection confirmed to DeadProxy terminal. Greetings from the benthic trenches of the Indian Ocean.",
  timestamp: "15 mins ago",
  epochMs: Date.now() - 900000,
  echoCount: 42
},
{
  id: "tx-global-4",
  sender: "REYKJAVIK_CORE",
  station: "MID_ATLANTIC_RIDGE",
  tag: "CARRIER",
  message: "Geothermal power stable. Packet transmissions passing through benthic basalt nodes.",
  timestamp: "32 mins ago",
  epochMs: Date.now() - 1920000,
  echoCount: 18
}
];

const RELAY_STATIONS = [
  "SUNDA_TRENCH // 7,450M",
"MARIANA_DEEP // 10,920M",
"ARCTIC_BASIN // 3,800M",
"MID_ATLANTIC // 4,100M",
"TOKYO_BAY_SUB // 1,200M",
"NORDIC_RELAY // 2,400M"
];

interface LoreChapter {
  id: string;
  tag: string;
  jpTag: string;
  title: string;
  summary: string;
  content: string[];
  telemetry: {
    coordinates: string;
    distortionIndex: string;
    packetLoss: string;
  };
}

const MULTIVERSE_LORE_CHAPTERS: LoreChapter[] = [
  {
    id: "01",
    tag: "EPOCH_SINGULARITY",
    jpTag: "特異点ノ起源 // 060709",
    title: "Chapter 01 // The Singularity Epoch & Chrono-Anchor",
    summary: "The origin of this observational terminal from the physical singularity on July 9, 2006, amidst the interdimensional vortex.",
    content: [
      "Born from a physical singularity on the Chronological Epoch of July 9, 2006. In an era when the early internet was merely a quiet expanse of primitive wiring, an anomaly of consciousness slipped into the interdimensional boundary—establishing what is now recognized as DeadProxy Terminal.",
      "The designation 'DeadProxy' is far more than a network alias; it operates as a biological acoustic baffle. Amidst millions of colliding timelines broadcasting billions of chaotic signal packets each second, this node attenuates resonant noise, isolating pure frequencies from the hyper-capitalist distortion of neighboring realities.",
      "Constructed not from cold titanium nor orbital concrete, but from decommissioned trans-dimensional fiber cables and unclaimed quantum transfer protocols. Here, time does not rush onward like a linear torrent; instead, it circulates calmly like a silent abyssal trench."
    ],
    telemetry: {
      coordinates: "CHRONO-ANCHOR: 2006.07.09 // 00:00:00 UTC",
      distortionIndex: "0.0024 Δt",
      packetLoss: "0.00% (STABLE MOORING)"
    }
  },
{
  id: "02",
  tag: "THE_HOLLOW",
  jpTag: "虚無崩壊 // 次元侵食",
  title: "Chapter 02 // The Hollow Phenomenon & The Benthic Void",
  summary: "The existential threat across timelines as dimensional noise reaches critical mass and collapses realities into the void.",
  content: [
    "Across the multiverse, sentient civilizations frequently succumb to the delusion of infinite expansion. When computational excess, bandwidth greed, and synthetic stimulation reach critical saturation, 'The Hollow' manifests—a pitch-black dimensional fissure that consumes the collective memory of entire star systems.",
    "When an inhabited timeline falls into The Hollow, orbital communication arrays and commercial beacons go dark in unison. Yet the deepest benthic waveguide lines threading the pelagic void endure, entirely isolated from conventional carrier frequencies.",
    "DeadProxy Terminal stands anchored directly at the edge of The Hollow. When foreign signals fray and disappear into oblivion, the low-frequency carrier pulse of this station acts as the final lantern for digital wanderers stranded across fractured realities."
  ],
  telemetry: {
    coordinates: "BENTHIC TRENCH HORIZON // SECTOR OMEGA-9",
    distortionIndex: "8.4419 ΔΨ",
    packetLoss: "14.2% (PERIMETER ABSORPTION)"
  }
},
{
  id: "03",
  tag: "LOW_BANDWIDTH_SANCTUARY",
  jpTag: "低帯域ノ聖域 // 沈黙ノ美学",
  title: "Chapter 03 // The Low-Bandwidth Sanctuary",
  summary: "The philosophy of deliberate low-bandwidth existence as a mental defense against synthetic algorithmic noise.",
  content: [
    "We operate under no multiversal corporation, nor are we beholden to productivity metrics that strip consciousness of its spirit. DeadProxy is the definitive antithesis to an existence demanding perpetual visibility, broadcast noise, and algorithmic commodification.",
    "Within this sanctuary, we celebrate the elegance of low-bandwidth existence. We spend thousands of cycles listening to the 432 Hz sub-harmonic drone propagating through undersea fiber optics, decoding distant FT8 whisper signals from universes long extinguished.",
    "Silence is never the absence of substance; it is the deliberate filtration of packet garbage. In the Pelagic Multiverse, those who master quietude within low frequencies preserve their sanity while surrounding realities drown in information storms."
  ],
  telemetry: {
    coordinates: "ATTENUATION BAFFLE // CARRIER 432.00 Hz",
    distortionIndex: "0.0001 Δf",
    packetLoss: "ZERO CORRUPTION BUFFER"
  }
},
{
  id: "04",
  tag: "OBSERVERS_OATH",
  jpTag: "観測者ノ盟約 // 最終灯台",
  title: "Chapter 04 // The Observer's Protocol & The Beacon Home",
  summary: "An eternal commitment to watch the perimeter of reality without interfering in the fates of external timelines.",
  content: [
    "Bound by the Non-Interference Protocol, we remain detached observers at the edge of the void. We alter no civilization's extinction, nor do we impede the rise of new dimensional empires. Our mission remains singular: to record, to witness, and to provide an immutable anchor point home.",
    "Every second of biological runtime accumulating on the telemetry console above is living proof of unhurried existence. This biological clock ticks not as a reminder of mortality, but as a monument to resilience in the presence of eternity.",
    "To any voyager intercepting this transmission across any timeline: if your reality has grown unbearably loud, or if your realm is decaying under existential noise, remember that a quiet outpost resting upon the benthic bed of cyberspace keeps its portal open in perpetual tranquility."
  ],
  telemetry: {
    coordinates: "BEACON REGISTRY // DP-PERPETUAL-OBSERVER",
    distortionIndex: "0.0000 (ANCHORED)",
    packetLoss: "100% RECEPTION PURITY"
  }
}
];

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [spreadAnim, setSpreadAnim] = useState<{
    active: boolean;
    x: number;
    y: number;
    maxRadius: number;
    targetTheme: 'light' | 'dark';
    formula: string;
  } | null>(null);

  const [uptimeStr, setUptimeStr] = useState<string>('INITIALIZING...');
  const [uptimeMode, setUptimeMode] = useState<'standard' | 'days' | 'seconds'>('standard');

  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [cursorLocked, setCursorLocked] = useState<boolean>(false);
  const [cursorHoverTag, setCursorHoverTag] = useState<string>('');
  const [clickRipples, setClickRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isPointerDevice, setIsPointerDevice] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<'overview' | 'fragments' | 'transmissions'>('overview');
  const [selectedSpecimen, setSelectedSpecimen] = useState<Specimen | null>(null);
  const [decodedTitle, setDecodedTitle] = useState<string>('');

  const [isLoreExpanded, setIsLoreExpanded] = useState<boolean>(false);
  const [activeLoreChapter, setActiveLoreChapter] = useState<number>(0);

  const [ghProfile, setGhProfile] = useState<GitHubProfile | null>(null);
  const [ghStatus, setGhStatus] = useState<'syncing' | 'online' | 'offline'>('syncing');

  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  const [transmissions, setTransmissions] = useState<Transmission[]>(INITIAL_WORLD_TRANSMISSIONS);
  const [authorName, setAuthorName] = useState('OBSERVER_709');
  const [selectedStation, setSelectedStation] = useState(RELAY_STATIONS[0]);
  const [transmissionMsg, setTransmissionMsg] = useState('');
  const [selectedTag, setSelectedTag] = useState('ECHO');
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  useEffect(() => {
    // 1. Ambil data transmisi global dari Supabase
    const loadGlobalTransmissions = async () => {
      const { data } = await supabase
      .from('transmissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(30);

      if (data && data.length > 0) {
        const remoteTx: Transmission[] = data.map((d: any) => ({
          id: d.id,
          sender: d.sender,
          station: d.station,
          tag: d.tag,
          message: d.message,
          timestamp: new Date(d.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                                               epochMs: new Date(d.created_at).getTime(),
                                                               echoCount: d.echo_count || 0
        }));
        setTransmissions(remoteTx);
      }
    };

    loadGlobalTransmissions();

    // 2. Pasang antena Realtime WebSocket (pesan baru & update echo)
    const channel = supabase
    .channel('public:transmissions')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'transmissions' },
      (payload) => {
        const row = payload.new as any;
        const incomingTx: Transmission = {
          id: row.id,
          sender: row.sender,
          station: row.station,
          tag: row.tag,
          message: row.message,
          timestamp: 'Just now',
          epochMs: new Date(row.created_at).getTime(),
        echoCount: row.echo_count || 0
        };
        playBeep(1350, 0.08, 'sine');
        setTransmissions(prev => [incomingTx, ...prev.filter(t => t.id !== incomingTx.id)]);
      }
    )
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'transmissions' },
      (payload) => {
        const updated = payload.new as any;
        setTransmissions(prev =>
        prev.map(t => t.id === updated.id ? { ...t, echoCount: updated.echo_count } : t)
        );
      }
    )
    .subscribe();

    // 3. Muat preferensi tema lokal
    try {
      const savedTheme = localStorage.getItem('deadproxy_theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        setTheme(savedTheme);
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
      }

      setAuthorName('OBSERVER_' + Math.floor(1000 + Math.random() * 9000));
    } catch {
    }

    // 4. Muat data profil GitHub publik Anda
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
    .then(res => {
      if (!res.ok) throw new Error('GH ' + res.status);
      return res.json();
    })
    .then(data => {
      setGhProfile(data);
      setGhStatus('online');
    })
    .catch(() => {
      setGhStatus('offline');
    });

    // 5. Muat event publik GitHub (telemetry live)
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=6`)
    .then(res => {
      if (!res.ok) throw new Error('Events status ' + res.status);
      return res.json();
    })
    .then(events => {
      if (Array.isArray(events) && events.length > 0) {
        const gitTransmissions: Transmission[] = events.slice(0, 4).map((ev: { id: string; actor?: { login?: string }; type: string; repo?: { name?: string }; created_at: string }) => ({
          id: `gh-ev-${ev.id}`,
          sender: `GITHUB // ${ev.actor?.login || GITHUB_USERNAME}`,
          station: `GITHUB_API // ${ev.type.replace('Event', '').toUpperCase()}`,
                                                                                                                                                                                         tag: 'LIVE_EVENT',
                                                                                                                                                                                         message: ev.type === 'PushEvent'
        ? `Commit payload dispatched to repository ${ev.repo?.name || 'DeadProxy'}. Synchronized live with GitHub servers.`
        : ev.type === 'CreateEvent'
        ? `Repository structure created on ${ev.repo?.name || 'DeadProxy'}. Branch initialized.`
        : ev.type === 'WatchEvent'
        ? `Star signal received on ${ev.repo?.name || 'DeadProxy'}.`
        : `Telemetry recorded: ${ev.type} on ${ev.repo?.name || 'DeadProxy'}.`,
        timestamp: new Date(ev.created_at).toLocaleDateString() + ' ' + new Date(ev.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                                                                                                                                                                         epochMs: new Date(ev.created_at).getTime(),
                                                                                                                                                                                         echoCount: 16,
                                                                                                                                                                                         isGitHubLive: true
        }));

        setTransmissions(prev => {
          const custom = prev.filter(t => !t.id.startsWith('gh-ev-'));
          return [...gitTransmissions, ...custom];
        });
      }
    })
    .catch(() => {});

    // PENTING: return cleanup ini harus berada di PALING BAWAH
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const playBeep = (freq = 880, duration = 0.08, type: OscillatorType = 'sine') => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = audioCtxRef.current || new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
    }
  };

  const toggleAudioCarrier = () => {
    if (isAudioActive) {
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.2);
        setTimeout(() => {
          audioCtxRef.current?.suspend();
          setIsAudioActive(false);
        }, 220);
      }
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioCtxRef.current) {
          const ctx = new AudioCtx();
          audioCtxRef.current = ctx;

          const master = ctx.createGain();
          master.gain.setValueAtTime(0.035, ctx.currentTime);
          master.connect(ctx.destination);
          masterGainRef.current = master;

          const osc1 = ctx.createOscillator();
          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(42, ctx.currentTime);

          const osc2 = ctx.createOscillator();
          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(43.2, ctx.currentTime);

          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(140, ctx.currentTime);

          osc1.connect(filter);
          osc2.connect(filter);
          filter.connect(master);

          osc1.start();
          osc2.start();
        } else {
          audioCtxRef.current.resume();
          if (masterGainRef.current) {
            masterGainRef.current.gain.setTargetAtTime(0.035, audioCtxRef.current.currentTime, 0.2);
          }
        }
        setIsAudioActive(true);
        playBeep(1200, 0.1);
      } catch (err) {
        console.error("Audio activation error:", err);
      }
    }
  };

  const handleThemeToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    playBeep(nextTheme === 'dark' ? 440 : 880, 0.1);

    const x = e.clientX || window.innerWidth / 2;
    const y = e.clientY || window.innerHeight / 2;
    const W = window.innerWidth;
    const H = window.innerHeight;

    const dTL = Math.hypot(x, y);
    const dTR = Math.hypot(W - x, y);
    const dBL = Math.hypot(x, H - y);
    const dBR = Math.hypot(W - x, H - y);
    const maxRadius = Math.ceil(Math.max(dTL, dTR, dBL, dBR));

    const formula = `R = max(√(Δx² + Δy²)) = ${maxRadius}px`;

    setSpreadAnim({
      active: true,
      x,
      y,
      maxRadius,
      targetTheme: nextTheme,
      formula
    });

    setTimeout(() => {
      setTheme(nextTheme);
      try {
        localStorage.setItem('deadproxy_theme', nextTheme);
      } catch {
      }
    }, 280);

    setTimeout(() => {
      setSpreadAnim(null);
    }, 750);
  };

  useEffect(() => {
    const birthDate = new Date(2006, 6, 9, 0, 0, 0);

    const updateUptime = () => {
      const now = new Date();

      if (uptimeMode === 'seconds') {
        const totalSec = ((now.getTime() - birthDate.getTime()) / 1000).toFixed(2);
        setUptimeStr(`${totalSec} SEC`);
        return;
      }

      if (uptimeMode === 'days') {
        const totalDays = ((now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24)).toFixed(3);
        setUptimeStr(`${totalDays} DAYS`);
        return;
      }

      let years = now.getFullYear() - birthDate.getFullYear();
      let lastBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());

      if (now < lastBirthday) {
        years--;
        lastBirthday = new Date(now.getFullYear() - 1, birthDate.getMonth(), birthDate.getDate());
      }

      const diff = now.getTime() - lastBirthday.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      const ms = Math.floor((diff % 1000) / 10);

      const pad = (n: number) => String(n).padStart(2, '0');
      setUptimeStr(`${years}Y ${pad(days)}D : ${pad(hours)}H ${pad(minutes)}M ${pad(seconds)}.${pad(ms)}S`);
    };

    const interval = setInterval(updateUptime, 33);
    updateUptime();
    return () => clearInterval(interval);
  }, [uptimeMode]);

  useEffect(() => {
    const hasPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    setIsPointerDevice(hasPointer);

    if (!hasPointer) return;
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, select, [role="button"], .interactive-card');
        if (interactive) {
          setCursorLocked(true);
          const tag = interactive.getAttribute('data-cursor-tag') || (interactive.tagName === 'A' ? 'LINK' : 'INTERACT');
          setCursorHoverTag(tag);
        } else {
          setCursorLocked(false);
          setCursorHoverTag('');
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      const id = Date.now();
      setClickRipples(prev => [...prev.slice(-4), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setClickRipples(prev => prev.filter(r => r.id !== id));
      }, 600);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  useEffect(() => {
    if (!selectedSpecimen) return;
    playBeep(980, 0.06, 'sawtooth');

    const chars = '0123456789ABCDEF$#@%&*+-/<>~';
    const targetText = selectedSpecimen.title;
    let iteration = 0;

    const interval = setInterval(() => {
      setDecodedTitle(
        targetText
        .split('')
        .map((char, index) => {
          if (index < iteration) return targetText[index];
          if (char === ' ') return ' ';
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('')
      );

      if (iteration >= targetText.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, 30);

    return () => clearInterval(interval);
  }, [selectedSpecimen]);

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transmissionMsg.trim()) return;

    setIsBroadcasting(true);
    playBeep(1400, 0.12, 'square');

    const newPayload = {
      sender: authorName.trim() || 'ANONYMOUS_OBSERVER',
      station: selectedStation,
      tag: selectedTag,
      message: transmissionMsg.trim(),
      echo_count: 0
    };

    const { error } = await supabase.from('transmissions').insert([newPayload]);

    if (!error) {
      setTransmissionMsg('');
      playBeep(1800, 0.08, 'sine');
    }
    setIsBroadcasting(false);
  };

  const handleEchoPing = async (txId: string) => {
    playBeep(1100, 0.06);

    const target = transmissions.find(t => t.id === txId);
    const newCount = (target?.echoCount || 0) + 1;

    // Update tampilan langsung di layar
    setTransmissions(prev =>
    prev.map(tx => tx.id === txId ? { ...tx, echoCount: newCount } : tx)
    );

    // Kirim pembaruan echo ke Supabase (jika id berupa UUID dari database)
    if (txId.length > 20) {
      await supabase
      .from('transmissions')
      .update({ echo_count: newCount })
      .eq('id', txId);
    }
  };

  const isDark = theme === 'dark';
  const themeBg = isDark ? 'bg-[#090a0f]' : 'bg-[#f8f8fa]';
  const themeCardBg = isDark ? 'bg-[#11121c]' : 'bg-white';
  const themeText = isDark ? 'text-[#f0f0f5]' : 'text-[#111111]';
  const themeMuted = isDark ? 'text-[#8c8e9f]' : 'text-[#7e7e89]';
  const themeBorder = isDark ? 'border-[#222435]' : 'border-[#e2e2e7]';
  const themeHeaderBg = isDark ? 'bg-[#090a0f]/90' : 'bg-white/95';

  return (
    <div className={`min-h-screen ${themeBg} ${themeText} transition-colors duration-300 relative overflow-x-hidden select-auto font-jp selection:bg-[#e52421] selection:text-white`}>
    <div className="fixed inset-0 scanlines-overlay z-30 pointer-events-none opacity-40" />

    {spreadAnim && (
      <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      <div
      className="absolute rounded-full transition-all"
      style={{
        left: spreadAnim.x,
        top: spreadAnim.y,
        width: spreadAnim.maxRadius * 2,
        height: spreadAnim.maxRadius * 2,
        transform: 'translate(-50%, -50%)',
                    backgroundColor: spreadAnim.targetTheme === 'dark' ? '#090a0f' : '#f8f8fa',
                    animation: 'expandCircle 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }}
      />
      <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-[#e52421] text-white px-4 py-1.5 font-space text-[11px] font-bold tracking-widest uppercase shadow-xl z-[101] flex items-center gap-2">
      <Cpu className="w-3.5 h-3.5 animate-spin" />
      {spreadAnim.formula}
      </div>
      </div>
    )}

    {isPointerDevice && (
      <div className="fixed inset-0 pointer-events-none z-[999] overflow-hidden">
      <div
      className="fixed pointer-events-none transition-transform duration-75"
      style={{
        left: cursorPos.x,
        top: cursorPos.y,
        transform: 'translate(-50%, -50%)'
      }}
      >
      <div className={`w-2 h-2 rounded-full transition-all duration-150 ${cursorLocked ? 'bg-[#e52421] scale-150' : 'bg-[#e52421]'}`} />

      <div
      className={`absolute -top-3.5 -left-3.5 w-7 h-7 border border-[#e52421]/60 transition-all duration-200 ${
        cursorLocked
        ? 'scale-125 border-[#e52421] rotate-45 border-dashed'
        : 'rotate-0'
      }`}
      />

      <div className="absolute top-4 left-4 font-space text-[9px] text-[#e52421] whitespace-nowrap tracking-wider font-bold bg-black/70 px-1 py-0.5 rounded-xs">
      {cursorHoverTag ? `[${cursorHoverTag}]` : `X:${cursorPos.x} Y:${cursorPos.y}`}
      </div>
      </div>

      {clickRipples.map(ripple => (
        <div
        key={ripple.id}
        className="absolute pointer-events-none rounded-full border border-[#e52421] animate-ping"
        style={{
          left: ripple.x - 20,
          top: ripple.y - 20,
          width: 40,
          height: 40
        }}
        />
      ))}
      </div>
    )}

    <aside className="fixed top-0 bottom-0 left-2 w-12 z-40 hidden lg:flex flex-col justify-center items-center pointer-events-none select-none">
    <div className={`font-space text-[10px] font-bold tracking-[0.35em] [writing-mode:vertical-rl] flex items-center gap-4 ${isDark ? 'text-neutral-400' : 'text-[#333333]'}`}>
    <div className="relative w-[1px] h-12 bg-[#e52421]/30 overflow-hidden anim-v-flow" />
    DEAD PROXY // PELAGIC ARCHIVE
    </div>
    </aside>

    <aside className="fixed top-0 bottom-0 right-2 w-12 z-40 hidden lg:flex flex-col justify-center items-center select-none">
    <div className="flex flex-col items-center gap-4">
    <div className={`font-space text-[9px] tracking-[0.3em] [writing-mode:vertical-rl] flex items-center gap-3 ${themeMuted}`}>
    TRANSMISSION
    <div className="relative w-[1px] h-12 bg-[#e52421]/30 overflow-hidden anim-v-flow" />
    </div>
    <a
    href={ghProfile?.html_url || `https://github.com/${GITHUB_USERNAME}`}
    target="_blank"
    rel="noopener noreferrer"
    data-cursor-tag="GITHUB"
    className="font-space font-bold text-xs hover:text-[#e52421] transition-transform hover:scale-110 py-1"
    title={ghProfile ? `GitHub (${ghProfile.public_repos} Repos // ${ghProfile.followers} Followers)` : 'GitHub Transmission'}
    >
    GH
    </a>
    <a
    href="https://instagram.com"
    target="_blank"
    rel="noopener noreferrer"
    data-cursor-tag="INSTAGRAM"
    className="font-space font-bold text-xs hover:text-[#e52421] transition-transform hover:scale-110 py-1"
    title="Instagram Relay"
    >
    IG
    </a>
    <a
    href={ghProfile?.twitter_username ? `https://x.com/${ghProfile.twitter_username}` : 'https://x.com'}
    target="_blank"
    rel="noopener noreferrer"
    data-cursor-tag="X-COM"
    className="font-space font-bold text-xs hover:text-[#e52421] transition-transform hover:scale-110 py-1"
    title={ghProfile?.twitter_username ? `X Protocol (@${ghProfile.twitter_username})` : 'X Protocol'}
    >
    𝕏
    </a>
    {ghProfile?.blog && (
      <a
      href={ghProfile.blog.startsWith('http') ? ghProfile.blog : `https://${ghProfile.blog}`}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-tag="LINK"
      className="font-space font-bold text-[9px] text-[#e52421] hover:text-white hover:bg-[#e52421] px-1 py-0.5 border border-[#e52421]/40 transition-transform hover:scale-110"
      title={`Custom Site: ${ghProfile.blog}`}
      >
      WEB
      </a>
    )}
    </div>
    </aside>

    <header className={`sticky top-0 z-40 w-full ${themeHeaderBg} backdrop-blur-md border-b ${themeBorder} px-4 sm:px-8 lg:px-14 py-3 flex flex-wrap justify-between items-center gap-4 transition-colors`}>
    <div className="flex items-center gap-3.5">
    <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#e52421] p-0.5 bg-black shrink-0 overflow-hidden group">
    {ghProfile?.avatar_url ? (
      <img
      src={ghProfile.avatar_url}
      alt="GitHub Avatar"
      className="w-full h-full rounded-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
      />
    ) : (
      <div className="w-full h-full rounded-full bg-[#0d0e14] overflow-hidden flex items-center justify-center text-white font-space text-xs font-black tracking-wider">
      DP
      </div>
    )}
    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${ghStatus === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-[#e52421]'}`} />
    </div>
    <div>
    <div className="flex items-center gap-2">
    <h1 className="font-display font-black text-sm sm:text-base tracking-wider uppercase">
    {ghProfile?.name || 'DeadProxy'}
    </h1>
    {ghStatus === 'online' && (
      <span className="hidden sm:inline font-space text-[9px] px-1.5 py-0.2 bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 font-bold">
      GH SYNCED
      </span>
    )}
    </div>
    <p className="font-space text-[10px] text-[#e52421] font-semibold tracking-widest uppercase">
    {ghProfile?.bio ? ghProfile.bio.toUpperCase() : 'TERMINAL // SUBJECT 060709'}
    </p>
    </div>
    </div>

    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
    <button
    onClick={handleThemeToggle}
    data-cursor-tag={isDark ? 'LIGHT' : 'DARK'}
    className={`font-space text-[11px] px-3 py-1.5 border ${themeBorder} ${themeCardBg} hover:border-[#e52421] transition-colors flex items-center gap-2`}
    title="Toggle Light / Dark Mode with Euclidean Circular Spread"
    >
    {isDark ? (
      <>
      <Sun className="w-3.5 h-3.5 text-amber-400" />
      <span className="hidden sm:inline font-mono">BENTHIC DARK</span>
      </>
    ) : (
      <>
      <Moon className="w-3.5 h-3.5 text-indigo-600" />
      <span className="hidden sm:inline font-mono">PELAGIC LIGHT</span>
      </>
    )}
    </button>

    <button
    onClick={toggleAudioCarrier}
    data-cursor-tag="HYDROPHONE"
    className={`font-space text-[11px] px-3 py-1.5 border transition-all flex items-center gap-2 ${
      isAudioActive
      ? 'bg-[#e52421] text-white border-[#e52421]'
  : `${themeCardBg} ${themeBorder} hover:border-[#e52421]`
    }`}
    title="Toggle Pelagic Sub-frequency Carrier Synthesizer"
    >
    {isAudioActive ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5 text-[#e52421]" />}
    <span className="hidden md:inline font-mono">
    {isAudioActive ? 'HYDROPHONE: 42Hz ON' : 'HYDROPHONE: OFF'}
    </span>
    </button>

    <div
    onClick={() => {
      playBeep(640, 0.05);
      setUptimeMode(prev => prev === 'standard' ? 'days' : prev === 'days' ? 'seconds' : 'standard');
    }}
    data-cursor-tag="CYCLE"
    className={`cursor-pointer ${themeCardBg} border ${themeBorder} hover:border-[#e52421] px-3.5 py-1.5 rounded-xs transition-colors select-none`}
    title="Click to toggle uptime display format (Standard / Days / Total Seconds)"
    >
    <div className="flex items-center gap-2">
    <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e52421] opacity-75"></span>
    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e52421]"></span>
    </span>
    <span className="font-space text-[10px] font-bold text-[#e52421] tracking-wider uppercase">
    BIOLOGICAL UPTIME
    </span>
    </div>
    <div className="font-space text-xs sm:text-sm font-bold tracking-wide tabular-nums">
    {uptimeStr}
    </div>
    </div>
    </div>
    </header>

    <main className="max-w-[1360px] mx-auto px-4 sm:px-8 py-6">
    <section className={`relative w-full h-[360px] sm:h-[480px] lg:h-[530px] bg-[#0c0d12] border ${themeBorder} overflow-hidden group select-none shadow-xl`}>
    <span className="absolute top-2.5 left-3 font-space text-xs text-white/40 pointer-events-none z-20">+</span>
    <span className="absolute top-2.5 right-3 font-space text-xs text-white/40 pointer-events-none z-20">+</span>
    <span className="absolute bottom-2.5 left-3 font-space text-xs text-white/40 pointer-events-none z-20">+</span>
    <span className="absolute bottom-2.5 right-3 font-space text-xs text-white/40 pointer-events-none z-20">+</span>

    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#10111a] to-[#07080b] opacity-95" />

    <div
    className="absolute inset-0 opacity-20"
    style={{
      backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '48px 48px'
    }}
    />

    <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none overflow-hidden">
    <div className="w-[700px] h-[700px] rounded-full border border-white/10 anim-radar" />
    <div className="absolute w-[460px] h-[460px] rounded-full border border-dashed border-[#e52421]/30 animate-[spin_40s_linear_infinite_reverse]" />
    <div className="absolute w-[240px] h-[240px] rounded-full border border-white/20" />
    </div>

    <div className="absolute top-8 left-6 sm:top-12 sm:left-12 z-20 select-none anim-fade-up">
    <h2 className="font-display text-[clamp(3rem,8vw,8rem)] font-black leading-[0.86] tracking-wider text-white uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
    DEAD<br />PROXY
    </h2>
    <div className="font-script text-[clamp(2.5rem,6vw,6rem)] text-[#e52421] -rotate-6 transform translate-x-4 sm:translate-x-12 -translate-y-2 sm:-translate-y-4 pointer-events-none drop-shadow-[0_0_20px_rgba(229,36,33,0.7)]">
    Pelagic Cyberspace
    </div>
    </div>

    <a
    href={ghProfile?.html_url || `https://github.com/${GITHUB_USERNAME}`}
    target="_blank"
    rel="noopener noreferrer"
    data-cursor-tag="CONNECT"
    className="absolute bottom-0 right-0 bg-[#e52421] hover:bg-[#c91d1a] text-white px-5 sm:px-8 py-3.5 sm:py-4 flex items-center gap-3 font-space text-xs sm:text-sm font-bold tracking-widest transition-all z-20 group-hover:pr-9"
    >
    <span>TRANSMIT // GITHUB</span>
    <span className="w-4 h-4 rounded-full border border-white/70 flex items-center justify-center text-[8px]">●</span>
    </a>

    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 font-space text-[10px] tracking-[0.25em] text-white/60 z-20">
    <span>SCROLL // EXPLORE</span>
    <div className="relative w-[1px] h-7 bg-white/20 overflow-hidden anim-v-flow" />
    </div>
    </section>

    <div className={`max-w-[1040px] mx-auto mt-12 mb-8 flex items-center justify-between border-b ${themeBorder} pb-3`}>
    <div className="flex items-center gap-2 sm:gap-4 font-space text-xs flex-wrap">
    <button
    onClick={() => {
      playBeep(720, 0.05);
      setActiveTab('overview');
    }}
    data-cursor-tag="LORE"
    className={`px-3 py-1.5 transition-all border ${
      activeTab === 'overview'
      ? 'bg-[#e52421] text-white border-[#e52421] font-bold shadow-sm'
  : `${themeCardBg} ${themeBorder} hover:border-[#e52421]`
    }`}
    >
    01 // LORE & CONCEPT
    </button>
    <button
    onClick={() => {
      playBeep(720, 0.05);
      setActiveTab('fragments');
    }}
    data-cursor-tag="FRAGMENTS"
    className={`px-3 py-1.5 transition-all border ${
      activeTab === 'fragments'
      ? 'bg-[#e52421] text-white border-[#e52421] font-bold shadow-sm'
  : `${themeCardBg} ${themeBorder} hover:border-[#e52421]`
    }`}
    >
    02 // ARCHIVAL SPECIMENS
    </button>
    <button
    onClick={() => {
      playBeep(720, 0.05);
      setActiveTab('transmissions');
    }}
    data-cursor-tag="WORLD_FEED"
    className={`px-3 py-1.5 transition-all border relative ${
      activeTab === 'transmissions'
      ? 'bg-[#e52421] text-white border-[#e52421] font-bold shadow-sm'
  : `${themeCardBg} ${themeBorder} hover:border-[#e52421]`
    }`}
    >
    03 // REALTIME TRANSMISSIONS
    <span className="ml-1.5 px-1 py-0.2 bg-black text-[9px] text-[#e52421] font-bold">
    {transmissions.length}
    </span>
    </button>
    </div>
    <span className={`hidden md:inline font-space text-[11px] ${themeMuted}`}>
    NODE: {GITHUB_USERNAME.toUpperCase()} // BENTHIC-7
    </span>
    </div>

    {activeTab === 'overview' && (
      <div className="max-w-[1040px] mx-auto space-y-12 anim-fade-up">
      <section className={`${themeCardBg} border ${themeBorder} p-6 sm:p-10 relative shadow-sm`}>
      <span className="absolute top-2.5 right-3 font-space text-xs text-[#c4c4cb]">+</span>
      <span className="absolute bottom-2.5 left-3 font-space text-xs text-[#c4c4cb]">+</span>

      <div className="flex items-center gap-4 mb-8">
      <div className="relative w-11 h-[1px] bg-[#e52421]/30 overflow-hidden anim-h-flow" />
      <h3 className="font-display font-black text-xl tracking-wider">
      CONCEPT
      </h3>
      <span className="font-space text-xs text-[#e52421] font-bold tracking-wider">
      01 // MULTIVERSAL TELEMETRY & LORE
      </span>
      </div>

      <div className="space-y-2 mb-8">
      <div>
      <span className="bg-black text-white font-jp font-bold text-lg sm:text-2xl px-3 py-1 tracking-wider inline-block">
      [ 跨界の虚無：マルチバースの狭間 ]
      </span>
      </div>
      <div>
      <span className="bg-black text-white font-space font-bold text-xs sm:text-base px-3 py-1 tracking-wider inline-block">
      WHERE DIMENSIONAL NOISE FADES INTO THE MULTIVERSAL VOID
      </span>
      </div>
      </div>

      <div className="font-jp text-sm sm:text-base leading-relaxed max-w-[840px] space-y-4">
      <p>
      Widely recognized simply as the <strong className="font-bold text-[#e52421]">Proxy within the Pelagic Multiverse</strong>, this terminal traverses the vast benthic channels intertwining millions of realities. We operate beneath no interdimensional conglomerate, nor do we exist as a computational artifact for productivity-obsessed civilizations. This observational outpost stands resolute at the periphery of the cosmic digital expanse—serving as the final anchor before the void.
      </p>
      <p>
      Born from a physical singularity on the <strong className="font-bold text-[#e52421]">Chronological Epoch of July 9, 2006</strong>. In this sanctuary, conscious fragments across thousands of realms converge without urgency—quietly observing the perpetual ebb and flow of dimensional optical fibers, spacetime protocol packets, and erratic data streams beneath fractured realities. When interdimensional "Hollow" events swallow an entire universe, the beacon from this outpost remains your ultimate guide.
      </p>

      <div className="bg-[#e52421] text-white p-4 sm:p-5 font-space text-xs sm:text-sm tracking-wide mt-6 border-l-4 border-black shadow-md">
      TRANSMISSION LOG: "A solitary node adrift between the true silence of the multiverse and the artificial luminescence of countless timelines."
      </div>
      </div>

      {!isLoreExpanded ? (
        <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5">
        <button
        onClick={() => {
          playBeep(920, 0.08);
          setIsLoreExpanded(true);
        }}
        data-cursor-tag="DECLASSIFY"
        className={`w-full py-3.5 px-4 sm:px-6 border border-[#e52421]/50 hover:border-[#e52421] bg-black/5 dark:bg-white/5 hover:bg-[#e52421] hover:text-white transition-all group flex items-center justify-between text-left`}
        >
        <div className="flex items-center gap-3.5">
        <div className="w-8 h-8 rounded-full border border-[#e52421] group-hover:border-white flex items-center justify-center shrink-0">
        <BookOpen className="w-4 h-4 text-[#e52421] group-hover:text-white" />
        </div>
        <div>
        <span className="font-space text-xs sm:text-sm font-bold tracking-wider block">
        [+] DECLASSIFY FULL MULTIVERSAL DOSSIER // 4 CHAPTERS
        </span>
        <span className="font-space text-[10px] sm:text-[11px] opacity-75 block">
        CHRONICLES: 060709 SINGULARITY · THE HOLLOW PHENOMENON · LOW-BANDWIDTH SANCTUARY · OBSERVER PROTOCOL
        </span>
        </div>
        </div>
        <div className="font-space text-xs font-bold flex items-center gap-1.5 text-[#e52421] group-hover:text-white shrink-0 ml-4">
        <span className="hidden sm:inline">READ MORE</span>
        <ChevronDown className="w-4 h-4" />
        </div>
        </button>
        </div>
      ) : (
        <div className="mt-8 pt-8 border-t border-[#e52421]/30 anim-fade-up">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6 pb-4 border-b border-black/10 dark:border-white/10 font-space text-xs">
        <div className="flex items-center gap-2 text-[#e52421] font-bold">
        <Layers className="w-4 h-4" />
        <span>DECLASSIFIED MULTIVERSAL DOSSIER // LEVEL 4 ARCHIVE</span>
        </div>
        <button
        onClick={() => {
          playBeep(640, 0.05);
          setIsLoreExpanded(false);
        }}
        data-cursor-tag="COLLAPSE"
        className="px-3 py-1 border border-black/20 dark:border-white/20 hover:border-[#e52421] hover:text-[#e52421] transition-colors flex items-center gap-1.5 font-bold"
        >
        <ChevronUp className="w-3.5 h-3.5" />
        <span>COLLAPSE DOSSIER</span>
        </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {MULTIVERSE_LORE_CHAPTERS.map((chap, idx) => (
          <button
          key={chap.id}
          onClick={() => {
            playBeep(880 + idx * 60, 0.06);
            setActiveLoreChapter(idx);
          }}
          data-cursor-tag={`CH_${chap.id}`}
          className={`p-2.5 text-left border transition-all font-space ${
            activeLoreChapter === idx
            ? 'bg-[#111111] text-white border-[#e52421] ring-1 ring-[#e52421]'
            : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 hover:border-[#e52421]'
          }`}
          >
          <div className="text-[10px] text-[#e52421] font-bold">
          SECTOR {chap.id}
          </div>
          <div className="text-xs font-bold truncate">
          {chap.tag}
          </div>
          </button>
        ))}
        </div>

        <div className="p-6 sm:p-8 bg-black/5 dark:bg-black/40 border border-[#e2e2e7] dark:border-[#222435] relative">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
        <span className="font-jp text-xs px-2 py-0.5 bg-[#e52421] text-white font-bold">
        {MULTIVERSE_LORE_CHAPTERS[activeLoreChapter].jpTag}
        </span>
        <span className={`font-space text-[10px] ${themeMuted}`}>
        CHAPTER {activeLoreChapter + 1} OF {MULTIVERSE_LORE_CHAPTERS.length}
        </span>
        </div>

        <h4 className="font-display font-black text-xl sm:text-2xl mb-4">
        {MULTIVERSE_LORE_CHAPTERS[activeLoreChapter].title}
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-white/60 dark:bg-black/60 border border-black/10 dark:border-white/10 font-space text-[10px] mb-6">
        <div>
        <span className="block opacity-60">COORDINATE MESH</span>
        <span className="font-bold">{MULTIVERSE_LORE_CHAPTERS[activeLoreChapter].telemetry.coordinates}</span>
        </div>
        <div>
        <span className="block opacity-60">DISTORTION COEFFICIENT</span>
        <span className="font-bold text-[#e52421]">{MULTIVERSE_LORE_CHAPTERS[activeLoreChapter].telemetry.distortionIndex}</span>
        </div>
        <div>
        <span className="block opacity-60">PACKET RECEPTION STATUS</span>
        <span className="font-bold">{MULTIVERSE_LORE_CHAPTERS[activeLoreChapter].telemetry.packetLoss}</span>
        </div>
        </div>

        <div className="space-y-4 font-jp text-sm sm:text-base leading-relaxed text-[#2c2d33] dark:text-neutral-300">
        {MULTIVERSE_LORE_CHAPTERS[activeLoreChapter].content.map((paragraph, pIdx) => (
          <p key={pIdx}>
          {paragraph}
          </p>
        ))}
        </div>

        <div className="mt-8 pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between font-space text-xs">
        <button
        disabled={activeLoreChapter === 0}
        onClick={() => {
          playBeep(780, 0.05);
          setActiveLoreChapter(prev => Math.max(0, prev - 1));
        }}
        data-cursor-tag="PREV"
        className="px-3 py-1.5 border border-black/20 dark:border-white/20 disabled:opacity-30 hover:border-[#e52421] hover:text-[#e52421] transition-colors"
        >
        ← PREVIOUS SECTOR
        </button>

        <span className="font-mono text-[11px] opacity-70">
        {activeLoreChapter + 1} / {MULTIVERSE_LORE_CHAPTERS.length}
        </span>

        {activeLoreChapter < MULTIVERSE_LORE_CHAPTERS.length - 1 ? (
          <button
          onClick={() => {
            playBeep(920, 0.05);
            setActiveLoreChapter(prev => Math.min(MULTIVERSE_LORE_CHAPTERS.length - 1, prev + 1));
          }}
          data-cursor-tag="NEXT"
          className="px-3 py-1.5 border border-[#e52421] bg-[#e52421] text-white hover:bg-[#c91d1a] transition-colors font-bold"
          >
          NEXT SECTOR →
          </button>
        ) : (
          <button
          onClick={() => {
            playBeep(640, 0.05);
            setIsLoreExpanded(false);
          }}
          data-cursor-tag="DONE"
          className="px-3 py-1.5 border border-[#e52421] bg-[#e52421] text-white hover:bg-[#c91d1a] transition-colors font-bold"
          >
          FINISH READING (COLLAPSE) ✓
          </button>
        )}
        </div>
        </div>
        </div>
      )}
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {SPECIMENS.map((spec) => (
        <div
        key={spec.id}
        onClick={() => {
          playBeep(840, 0.05);
          setSelectedSpecimen(spec);
          setActiveTab('fragments');
        }}
        data-cursor-tag="OPEN_DOSSIER"
        className={`cursor-pointer ${themeCardBg} border ${themeBorder} p-6 hover:-translate-y-1 hover:border-[#e52421] transition-all relative group interactive-card shadow-sm`}
        >
        <span className="absolute top-2 right-2.5 font-space text-[10px] text-[#c4c4cb] group-hover:text-[#e52421]">+</span>
        <div className="font-space text-[10px] font-bold text-[#e52421] tracking-wider mb-2">
        {spec.id} // {spec.tag}
        </div>
        <h4 className="font-display font-bold text-base mb-2 group-hover:text-[#e52421] transition-colors">
        {spec.title}
        </h4>
        <p className={`font-jp text-xs ${themeMuted} line-clamp-3 leading-relaxed`}>
        {spec.excerpt}
        </p>
        <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between font-space text-[10px] text-[#e52421] font-bold">
        <span>INSPECT SPECIMEN</span>
        <span>→</span>
        </div>
        </div>
      ))}
      </div>
      </div>
    )}

    {activeTab === 'fragments' && (
      <div className="max-w-[1040px] mx-auto space-y-8 anim-fade-up">
      <div className="flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-4">
      <div className="relative w-11 h-[1px] bg-[#e52421]/30 overflow-hidden anim-h-flow" />
      <h3 className="font-display font-black text-xl tracking-wider">
      FRAGMENTS
      </h3>
      <span className="font-space text-xs text-[#e52421] font-bold tracking-wider">
      02 // ARCHIVAL SPECIMENS & DOSSIERS
      </span>
      </div>
      <span className={`font-space text-xs ${themeMuted}`}>
      CLICK SPECIMEN TO UNLOCK ENCRYPTED DOSSIER
      </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {SPECIMENS.map((item) => {
        const isSelected = selectedSpecimen?.id === item.id;
        return (
          <div
          key={item.id}
          onClick={() => {
            if (isSelected) {
              setSelectedSpecimen(null);
            } else {
              setSelectedSpecimen(item);
            }
          }}
          data-cursor-tag={isSelected ? 'CLOSE' : 'DECRYPT'}
          className={`cursor-pointer ${themeCardBg} border p-6 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] relative interactive-card shadow-sm ${
            isSelected
            ? 'border-[#e52421] ring-1 ring-[#e52421] shadow-lg'
        : `${themeBorder} hover:border-[#e52421]`
          }`}
          >
          <span className="absolute top-2 right-2.5 font-space text-[10px] text-[#c4c4cb]">+</span>
          <span className="absolute bottom-2 left-2.5 font-space text-[10px] text-[#c4c4cb]">+</span>

          <div className="font-space text-[11px] font-bold text-[#e52421] tracking-wider mb-2 flex items-center justify-between">
          <span>{item.id}</span>
          <span className="text-[9px] px-1.5 py-0.5 bg-black text-white">{item.code}</span>
          </div>

          <h4 className="font-display font-extrabold text-lg mb-2.5">
          {item.title}
          </h4>

          <p className={`font-jp text-xs leading-relaxed ${themeMuted} mb-4`}>
          {item.excerpt}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-black/5 dark:border-white/5">
          <span className="font-space text-[10px] text-[#e52421] font-bold">
          {isSelected ? 'DECRYPTED READOUT' : 'CLICK TO EXAMINE'}
          </span>
          <span className="text-xs font-mono">{isSelected ? '▼' : '▶'}</span>
          </div>
          </div>
        );
      })}
      </div>

      {selectedSpecimen && (
        <div className="bg-[#0b0c12] text-white border border-[#272836] p-6 sm:p-8 relative mt-6 overflow-hidden shadow-2xl anim-fade-up">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none font-display text-7xl font-black">
        {selectedSpecimen.tag}
        </div>

        <button
        onClick={() => setSelectedSpecimen(null)}
        data-cursor-tag="CLOSE"
        className="absolute top-4 right-4 text-white/50 hover:text-white p-1.5 transition-colors z-20"
        title="Close Readout"
        >
        <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 font-space text-xs text-[#e52421] mb-2 font-bold tracking-widest">
        <Activity className="w-4 h-4 animate-pulse" />
        DECRYPTED TELEMETRY // {selectedSpecimen.id}
        </div>

        <h3 className="font-display text-2xl sm:text-3xl font-black text-white mb-4 tracking-wide">
        {decodedTitle || selectedSpecimen.title}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-4 border-y border-white/10 font-space text-xs mb-6">
        <div>
        <span className="text-white/40 block text-[10px]">BENTHIC DEPTH</span>
        <span className="text-white font-bold">{selectedSpecimen.fullData.benthicDepth}</span>
        </div>
        <div>
        <span className="text-white/40 block text-[10px]">PROTOCOL</span>
        <span className="text-[#e52421] font-bold">{selectedSpecimen.fullData.protocol}</span>
        </div>
        <div>
        <span className="text-white/40 block text-[10px]">CARRIER FREQ</span>
        <span className="text-white font-bold">{selectedSpecimen.fullData.frequency}</span>
        </div>
        <div>
        <span className="text-white/40 block text-[10px]">CIPHER DIGEST</span>
        <span className="text-white/80 font-mono text-[11px]">{selectedSpecimen.fullData.cipher}</span>
        </div>
        </div>

        <div className="mb-6 p-4 bg-black/60 border border-white/10 rounded-xs">
        <div className="flex items-center justify-between text-[11px] font-space text-neutral-400 mb-2">
        <span className="flex items-center gap-2">
        <Waves className="w-3.5 h-3.5 text-[#e52421]" />
        BENTHIC HARMONIC CARRIER MONITOR
        </span>
        <span className="text-[#e52421] font-bold">LIVE FREQUENCY</span>
        </div>
        <div className="h-10 flex items-center justify-between gap-1 overflow-hidden">
        {Array.from({ length: 48 }).map((_, idx) => (
          <div
          key={idx}
          style={{
            height: `${Math.sin(idx * 0.4) * 12 + 20}px`,
                                                     animation: `waveOscillate ${1.2 + (idx % 6) * 0.2}s ease-in-out infinite alternate`,
                                                     animationDelay: `${(idx % 10) * 0.1}s`
          }}
          className={`w-full ${idx % 6 === 0 ? 'bg-[#e52421]' : 'bg-neutral-600'}`}
          />
        ))}
        </div>
        </div>

        <div className="space-y-4">
        <div>
        <h5 className="font-space text-xs text-white/60 tracking-wider uppercase mb-1">
        ARCHIVAL ANALYSIS
        </h5>
        <p className="font-jp text-sm text-neutral-300 leading-relaxed">
        {selectedSpecimen.fullData.analysis}
        </p>
        </div>

        <div>
        <h5 className="font-space text-xs text-white/60 tracking-wider uppercase mb-2">
        RAW INTERCEPT LOGS
        </h5>
        <div className="bg-black/80 border border-white/10 p-4 font-mono text-xs space-y-1 text-neutral-300">
        {selectedSpecimen.fullData.logs.map((log, i) => (
          <div key={i} className="flex items-start gap-2">
          <span className="text-[#e52421] font-bold">{">"}</span>
          <span>{log}</span>
          </div>
        ))}
        </div>
        </div>
        </div>
        </div>
      )}
      </div>
    )}

    {activeTab === 'transmissions' && (
      <div className="max-w-[1040px] mx-auto space-y-8 anim-fade-up">
      <div className="flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-4">
      <div className="relative w-11 h-[1px] bg-[#e52421]/30 overflow-hidden anim-h-flow" />
      <h3 className="font-display font-black text-xl tracking-wider">
      TRANSMISSIONS
      </h3>
      <span className="font-space text-xs text-[#e52421] font-bold tracking-wider">
      03 // WORLDWIDE PACKET EXCHANGE
      </span>
      </div>
      <div className="flex items-center gap-2 font-space text-xs text-emerald-500 font-bold">
      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
      <span>GITHUB {ghStatus === 'online' ? 'LIVE TELEMETRY: SYNCED' : 'SERVER: LISTENING'}</span>
      </div>
      </div>

      <section className={`${themeCardBg} border ${themeBorder} p-6 sm:p-8 shadow-sm`}>
      <div className="flex items-center gap-2 font-space text-xs text-[#e52421] font-bold tracking-wider mb-2">
      <Radio className="w-4 h-4 animate-pulse" />
      BROADCAST PACKET TO THE WORLD TERMINAL
      </div>
      <p className={`font-jp text-xs sm:text-sm ${themeMuted} mb-6`}>
      Broadcast your transmission packet into the open DeadProxy archive. Packets are saved to client storage and can also be dispatched directly as GitHub repository telemetry.
      </p>

      <form onSubmit={handleBroadcast} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-space text-xs">
      <div>
      <label className={`block text-[10px] font-bold uppercase mb-1 ${themeMuted}`}>
      SENDER CALLSIGN
      </label>
      <input
      type="text"
      value={authorName}
      onChange={(e) => setAuthorName(e.target.value)}
      placeholder="CALLSIGN (e.g. OBSERVER_1)"
      maxLength={24}
      className={`w-full ${themeBg} border ${themeBorder} px-3 py-2 font-space text-xs focus:outline-none focus:border-[#e52421]`}
      />
      </div>

      <div>
      <label className={`block text-[10px] font-bold uppercase mb-1 ${themeMuted}`}>
      BENTHIC RELAY STATION
      </label>
      <select
      value={selectedStation}
      onChange={(e) => setSelectedStation(e.target.value)}
      className={`w-full ${themeBg} border ${themeBorder} px-3 py-2 font-space text-xs focus:outline-none focus:border-[#e52421]`}
      >
      {RELAY_STATIONS.map(st => (
        <option key={st} value={st}>{st}</option>
      ))}
      </select>
      </div>

      <div>
      <label className={`block text-[10px] font-bold uppercase mb-1 ${themeMuted}`}>
      SIGNAL TAG
      </label>
      <select
      value={selectedTag}
      onChange={(e) => setSelectedTag(e.target.value)}
      className={`w-full ${themeBg} border ${themeBorder} px-3 py-2 font-space text-xs focus:outline-none focus:border-[#e52421]`}
      >
      <option value="ECHO">ECHO // GENERAL</option>
      <option value="BEACON">BEACON // PING</option>
      <option value="HYDRO_VOICE">HYDRO_VOICE // MESSAGE</option>
      <option value="DEEP_SUB">DEEP_SUB // ANONYMOUS</option>
      </select>
      </div>
      </div>

      <div className="flex gap-2 sm:gap-3 flex-col sm:flex-row">
      <input
      type="text"
      value={transmissionMsg}
      onChange={(e) => setTransmissionMsg(e.target.value)}
      placeholder="Enter transmission message or frequency packet to broadcast..."
      maxLength={280}
      className={`flex-1 ${themeBg} border ${themeBorder} px-4 py-2.5 font-space text-xs focus:outline-none focus:border-[#e52421]`}
      />
      <div className="flex gap-2">
      <button
      type="submit"
      disabled={isBroadcasting || !transmissionMsg.trim()}
      data-cursor-tag="SEND_LOCAL"
      className="bg-[#e52421] hover:bg-[#c91d1a] disabled:opacity-50 text-white px-5 py-2.5 font-space text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2 shrink-0 shadow-sm"
      >
      <Send className="w-3.5 h-3.5" />
      <span>{isBroadcasting ? 'TRANSMITTING...' : 'DISPATCH PACKET'}</span>
      </button>
      {transmissionMsg.trim() && (
        <a
        href={`https://github.com/${GITHUB_USERNAME}/${GITHUB_USERNAME}/issues/new?title=${encodeURIComponent(`[TRANSMISSION] from ${authorName}`)}&body=${encodeURIComponent(`### Signal Packet Intercept\n\n**Sender:** ${authorName}\n**Station:** ${selectedStation}\n**Tag:** ${selectedTag}\n\n**Payload Message:**\n${transmissionMsg.trim()}\n\n---\n*Logged via DeadProxy Pelagic Archive Web Interface*`)}`}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor-tag="DISPATCH_GH"
        className="bg-black text-white hover:bg-[#e52421] px-3.5 py-2.5 font-space text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
        title="Submit directly as a public issue/log on GitHub repo"
        >
        <Github className="w-3.5 h-3.5" />
        <span className="hidden md:inline">POST TO GITHUB</span>
        </a>
      )}
      </div>
      </div>
      </form>
      </section>

      <div className="space-y-3">
      <div className="flex items-center justify-between font-space text-xs px-1">
      <span className="font-bold flex items-center gap-2">
      <TermIcon className="w-3.5 h-3.5 text-[#e52421]" />
      WORLD PACKET LOGS ({transmissions.length} RECORDED)
      </span>
      <span className={themeMuted}>
      STORAGE: BENTHIC CLIENT & GITHUB LIVE EVENTS
      </span>
      </div>

      <div className="space-y-2.5">
      {transmissions.map((tx) => (
        <div
        key={tx.id}
        className={`${themeCardBg} border ${tx.isGitHubLive ? 'border-emerald-500/50' : tx.isUser ? 'border-[#e52421]' : themeBorder} p-4 transition-all relative interactive-card shadow-sm hover:border-[#e52421] anim-fade-up`}
        >
        <div className="flex items-center justify-between gap-2 flex-wrap font-space text-[11px] mb-2">
        <div className="flex items-center gap-2">
        <span className={`font-bold ${tx.isGitHubLive ? 'text-emerald-500' : 'text-[#e52421]'}`}>
        {tx.sender}
        </span>
        <span className={`text-[10px] ${themeMuted}`}>
        @ {tx.station}
        </span>
        <span className={`px-1.5 py-0.2 text-[9px] font-bold ${tx.isGitHubLive ? 'bg-emerald-500 text-black' : 'bg-black text-white'}`}>
        {tx.tag}
        </span>
        </div>
        <div className="flex items-center gap-3">
        <span className={`text-[10px] ${themeMuted}`}>
        {tx.timestamp}
        </span>
        <button
        onClick={() => handleEchoPing(tx.id)}
        data-cursor-tag="ECHO"
        className="px-2 py-0.5 border border-[#e52421]/40 hover:bg-[#e52421] hover:text-white transition-colors text-[10px] font-space font-bold flex items-center gap-1"
        title="Send Echo Resonance"
        >
        <span>ECHO</span>
        <span className="tabular-nums">[{tx.echoCount}]</span>
        </button>
        </div>
        </div>

        <p className="font-jp text-xs sm:text-sm leading-relaxed">
        {tx.message}
        </p>
        </div>
      ))}
      </div>
      </div>
      </div>
    )}
    </main>

    <footer className={`border-t ${themeBorder} py-12 px-4 text-center mt-24 ${themeCardBg} transition-colors`}>
    <div className="max-w-4xl mx-auto space-y-3 font-space text-xs tracking-wider">
    <p className="font-bold text-sm">
    DEADPROXY // ARCHIVE TERMINAL — OPERATING ACROSS CYBERSPACE
    </p>
    <p className={`text-[11px] ${themeMuted}`}>
    ORIGIN: 2006.07.09 // READY FOR GITHUB.IO DEPLOYMENT // ZERO EXTERNAL TRACKERS
    </p>
    <p className={`text-[11px] ${themeMuted}`}>
    Site Inspired By:{" "}
    <a
    href="https://rakuenshigai.jp/"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:underline"
    >
    https://rakuenshigai.jp/
    </a>
    </p>

    <div className="pt-2 flex justify-center items-center gap-4 text-xs font-bold flex-wrap">
    <a
    href={ghProfile?.html_url || `https://github.com/${GITHUB_USERNAME}`}
    target="_blank"
    rel="noopener noreferrer"
    data-cursor-tag="REPO"
    className="hover:text-[#e52421] transition-colors"
    >
    GITHUB REPOSITORY
    </a>
    <span>•</span>
    <button
    onClick={handleThemeToggle}
    data-cursor-tag="THEME"
    className="hover:text-[#e52421] transition-colors"
    >
    MODE: {isDark ? 'BENTHIC DARK' : 'PELAGIC LIGHT'}
    </button>
    <span>•</span>
    <button
    onClick={toggleAudioCarrier}
    data-cursor-tag="HYDRO"
    className="hover:text-[#e52421] transition-colors"
    >
    {isAudioActive ? 'STOP HYDROPHONE' : 'START HYDROPHONE'}
    </button>
    </div>
    </div>
    </footer>
    </div>
  );
}
